import { Place, Side, Off, CombatResult } from '../types';

import Army, { addCP } from './army';
import fns from './fns';

type BattleState = {
    /** base points of armies, with all army effects (hero, items, upgrades), but w/o global things like wall or moralebonus */
    base: {
        off: number
        def: number
    }
    /** final points with all bonuses */
    final: {
        off: number
        def: number
    }
    /** current level of wall, coincides with place.wall except for early ramming phase */
    wall: number
    /** coefficient for battle */
    immensity: number
    /** points ratio */
    readonly ratio: number 
}

export default {
    Army,
    fns,
    log(message: string): void {},
    BASE_VILLAGE_DEF: 10,
    place: {} as Place,
    def: [] as Army[],
    off: {} as Off,
    offArmy: {} as Army,
    state: {
        base: { off: 0, def: 0 },
        final: { off: 0, def: 0 },
        wall: 0,
        immensity: 1,
        get ratio() {
            return this.final.off / this.final.def;
        }
    } as BattleState,
    result: {} as CombatResult,
    /**
     * return morale "malus"
     * @param {boolean} remorale whether compensate
     * @returns {number} 
     */
    morale(remorale = false) {
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
             + (this.place.wall.bonus(this.place.wall.level).def || 0)
    },
    calcDefBoni() {
        this.state.final.def = (this.state.base.def + this.getDefAbsolute()) * this.getDefBonus();
    },
    calcBasePoints() {
        const offPts = this.offArmy.off;
        const defPts = this.def.map(e => e.def).reduce(addCP);
        const [off, def] = this.fns.adducedDef(offPts, defPts);
        this.state.base = { off, def };
        const total = this.def.reduce((n, d) => n + d.total, this.offArmy.total);
        this.state.immensity = this.fns.immensity(total);
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
        if (!rams || !this.state.wall) return;
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
        const morale = this.cataMorale();
        if (targets.length === 0) return;
        let [cats, catUps] = this.offArmy.cats;
        cats /= targets.length;
        const points = this.fns.demolishPoints(cats, catUps, this.place.durBonus, this.state.ratio, morale);
        this.log("cata points = " + points);
        this.result.buildings = this.off.targets.map(b => this.fns.demolish(b, points));
    },
    scan() {
        const offPoints = new this.Army(this.off).scan * this.morale();
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
            buildings: []
        };
        this.state.wall = this.place.wall.level;
        if (this.offArmy.isScan()) {
            this.scan();
        } else if (this.off.type === 'raid') {
            this.raid();
        } else {
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
        if (this.offArmy.total === 1) {
            const off = (this.offArmy.off.i + this.offArmy.off.c);
            const morale = this.morale(false);
            this.log(`lone attacker: ${off} * ${morale} = ${off * morale}`);
            if (off * morale < 84.5) this.result.offLosses = 1;
        }
    },
}

