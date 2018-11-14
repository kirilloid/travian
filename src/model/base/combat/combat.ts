import { Place, Side, Off, BattleState } from './types';
import { CombatResult } from '../../types';

import CombatPoints from './points';

import Army from './army';
import fns from './fns';

export default {
    Army,
    fns,
    log(message: string): void { /* do nothing */ },
    BASE_VILLAGE_DEF: 10,
    place: {} as Place,
    def: [] as Army<Side>[],
    off: {} as Off,
    offArmy: {} as Army<Side>,
    state: {
        base: { off: 0, def: 0 },
        final: { off: 0, def: 0 },
        wall: 0,
        immensity: 1,
        get ratio() {
            return this.final.off / this.final.def;
        },
    } as BattleState,
    result: {} as CombatResult,
    /**
     * returns morale "malus" (inverse of bonus)
     * accepts whether to compensate for big defs
     */
    morale(remorale: boolean = false) {
        return this.fns.morale(
            this.off.pop,
            this.place.pop,
            remorale ? (this.state.final.off / this.state.final.def) : 1);
    },
    cataMorale() {
        return this.fns.cataMorale(this.off.pop, this.place.pop);
    },
    getDefBonus() {
        return 1 + this.place.wall.bonus(this.place.wall.level).defBonus;
    },
    getDefAbsolute() {
        return this.BASE_VILLAGE_DEF
             + (this.place.def || 0)
             + (this.place.wall.bonus(this.place.wall.level).def || 0);
    },
    calcDefBoni() {
        this.state.final.def = (this.state.base.def + this.getDefAbsolute()) * this.getDefBonus();
    },
    calcBasePoints() {
        const offPts = this.offArmy.getOff();
        this.log(`off = ${offPts.i}/${offPts.c}`);
        const defPts = this.def.map(e => e.getDef()).reduce(CombatPoints.add);
        this.log(`def = ${defPts.i}/${defPts.c}`);
        const [off, def] = this.fns.adducedDef(offPts, defPts);
        this.log(`adduced = ${off}/${def}`);
        this.state.base = { off, def };
        const total = this.def.reduce((n, d) => n + d.getTotal(), this.offArmy.getTotal());
        this.state.immensity = this.fns.immensity(total);
        this.log(`immensity = ${this.state.immensity}`);
    },
    calcTotalPoints() {
        this.calcDefBoni();
        this.state.final.off = this.state.base.off;
        const morale = this.morale(true);
        this.state.final.off = this.state.base.off * morale;
    },
    calcRatio() {
        return this.state.ratio ** this.state.immensity;
    },
    calcRams() {
        const [rams, ramUps] = this.offArmy.rams;
        if (!rams || !this.state.wall) { return; }
        const { wall } = this.place;
        const earlyPoints = this.fns.demolishPoints(rams, ramUps, this.place.durBonus, this.state.ratio);
        // get in-battle wall level
        this.state.wall = this.fns.demolishWall(wall.durability, wall.level, earlyPoints);
        // recalculate points with new wall bonus
        this.calcTotalPoints();
        // finally demolish wall
        const points = this.fns.demolishPoints(rams, ramUps, this.place.durBonus, this.state.ratio);
        this.result.wall = this.fns.demolish(wall.level, points);
    },
    calcCatapults() {
        const { targets } = this.off;
        if (targets.length === 0) { return; }
        const morale = this.cataMorale();
        const [cats, catUps] = this.offArmy.cats;
        const points = this.fns.demolishPoints(
            cats / targets.length,
            catUps,
            this.place.durBonus,
            this.state.ratio,
            morale,
        );
        this.log("cata demolish points = " + points);
        this.result.buildings = this.off.targets.map(b => this.fns.demolish(b, points));
    },
    scan() {
        const offPoints = this.offArmy.scan * this.morale();
        const defPoints = this.def.reduce((a, b) => a + b.scanDef, 0) * this.getDefBonus();
        const losses = Math.min((defPoints / offPoints) ** 1.5, 1);
        this.result.offLosses = losses;
        this.result.defLosses = 0;
    },
    raid() {
        this.calcBasePoints();
        this.calcTotalPoints();
        const x = this.calcRatio();
        const [offLosses, defLosses] = this.fns.raid(x);
        this.result.offLosses = offLosses;
        this.result.defLosses = defLosses;
    },
    normal() {
        this.calcBasePoints();
        this.calcTotalPoints();
        this.calcRams();
        const x = this.calcRatio();
        this.result.offLosses = Math.min(1/x, 1);
        this.result.defLosses = Math.min(x, 1);
        this.calcCatapults();
    },
    wave() {
        this.result = {
            offLosses: 0,
            defLosses: 0,
            wall: this.place.wall.level,
            buildings: [],
        };
        this.state.wall = this.place.wall.level;
        if (this.offArmy.isScan()) {
            this.log('scan');
            this.scan();
        } else if (this.off.type === 'raid') {
            this.log('raid');
            this.raid();
        } else {
            this.log('normal');
            this.normal();
        }
        this.loneAttackerDies();
    },
    combat(place: Place, sides: Side[]): CombatResult[] {
        this.place = place;
        this.def = [];
        const results: CombatResult[] = [];
        for (const side of sides) {
            if (side.kind === 'def') {
                this.def.push(new this.Army(side));
            } else {
                this.off = side;
                this.offArmy = new this.Army(side);
                this.wave();
                results.push(this.result);
                this.def.forEach(a => a.applyLosses(this.result.defLosses));
            }
        }
        return results;
    },
    loneAttackerDies() {
        if (this.offArmy.getTotal() === 1) {
            const { i, c } = this.offArmy.getOff();
            const off = i + c;
            const morale = this.morale(false);
            this.log(`lone attacker: ${off} * ${morale} = ${off * morale}`);
            if (off * morale < 84.5) { this.result.offLosses = 1; }
        }
    },
};
