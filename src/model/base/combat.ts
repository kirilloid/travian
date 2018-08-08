import { Place, Side, Off, CombatResult } from '../types';

import Army, { addCP } from './army';
import fns from './fns';

export default {
    Army,
    fns,
    log(message: string): void {},
    BASE_VILLAGE_DEF: 10,
    place: {} as Place,
    def: [] as Army[],
    off: {} as Off,
    offArmy: {} as Army,
    current: {
        off: 0,
        def: 0,
        total: 0,
        imm: 1,
        ratio: 1,
    },
    result: {} as CombatResult,
    morale(remorale = false) {
        return this.fns.morale(
            this.off.pop, this.place.pop,
            remorale ? this.current.off / this.current.def : 1);
    },
    cataMorale() {
        return this.fns.cataMorale(this.off.pop, this.place.pop);
    },
    calcScan() {
        const offPoints = new this.Army(this.off).scan * this.morale();
        const defPoints = this.def.reduce((a, b) => a + b.scanDef, 0) * this.place.defBonus;
        const losses = Math.min((defPoints / offPoints) ** 1.5, 1);
        this.result = {
            offLosses: losses,
            defLosses: 0
        };
    },
    loneAttackerDies() {
        if (this.offArmy.total === 1) {
            const off = (this.offArmy.off.i + this.offArmy.off.c);
            const morale = this.morale(false);
            this.log(`lone attacker: ${off} * ${morale} = ${off * morale}`);
            if (off * morale < 84.5) this.result.offLosses = 1;
        }
    },
    calcRatio() {
        const offPts = this.offArmy.off;
        const defPts = this.def.map(e => e.def).reduce(addCP);
        const cur = this.current;
        [cur.off, cur.def] = this.fns.adducedDef(offPts, defPts);
        cur.total = this.def.reduce((n, d) => n + d.total, this.offArmy.total);
        cur.def += this.BASE_VILLAGE_DEF + this.place.def;
        cur.def *= this.place.defBonus;
        const morale = this.morale(true);
        cur.off *= morale;
        cur.imm = this.fns.immensity(cur.total);
        cur.ratio = Math.round(cur.off) / Math.round(cur.def);
        const x = cur.ratio ** cur.imm;
        this.log("immensity = " + cur.imm);
        this.log("x = " + x);
        return x;
    },
    calcRaid() {
        const x = this.calcRatio();
        const [offLosses, defLosses] = this.fns.raid(x);
        this.result = { offLosses, defLosses };
    },
    calcCatapults() {
        const { targets } = this.off;
        const morale = this.cataMorale();
        if (targets.length > 0) {
            let [cats, catUps] = this.offArmy.cats;
            cats /= targets.length;
            const points = fns.demolishPoints(cats, catUps, this.place.durBonus, this.current.ratio, morale);
            this.log("cata points = " + points);
            this.result.buildings = this.off.targets.map(b => fns.demolish(b, points));
        }
    },
    calcNormal() {
        const x = this.calcRatio();
        this.result = {
            offLosses: Math.min(1/x, 1),
            defLosses: Math.min(x, 1)
        };
        this.calcCatapults();
    },
    calcWave() {
        if (this.offArmy.isScan()) {
            this.calcScan();
        } else if (this.off.type === 'raid') {
            this.calcRaid();
        } else {
            this.calcNormal();
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
                this.calcWave();
                results.push(this.result);
                this.def.forEach(a => a.applyLosses(this.result.defLosses));
            }
        }
        return results;
    },
}

