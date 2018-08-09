import { roundP, limit, compose } from '../../utils';

import { CombatPoints } from '../types';

const roundPercent = roundP(1e-4);

const earlyRamTable: number[][] = [];
for (let lvl = 0; lvl <= 20; lvl++) {
    let l;
    let row = [];
    for (l = 0; l <= lvl / 2; l++) {
        row.push(-2 * l ** 2 + (2 * lvl + 1) * l);
    }
    const base = lvl * (lvl + 1) / 2 + 20;
    for (l; l <= lvl; l++) {
        const dl = l - Math.floor(lvl / 2) - 1;
        row.push(1.25 * dl**2 + 49.75 * dl + base);
    }
    row.push(1e9);
    earlyRamTable.push(row);
}
export default {
    morale(offPop: number, defPop: number, ptsRatio = 1) {
        if (offPop <= defPop) { return 1; }
        const popRatio = offPop / Math.max(defPop, 3);
        return Math.max(0.667, roundP(1e-3)(popRatio ** (-0.2 * Math.min(ptsRatio, 1))));
    },
    cataMorale(offPop: number, defPop: number) {
        return limit(0.3333, 1)((offPop / defPop) ** -0.3);
    },
    adducedDef(off: CombatPoints, def: CombatPoints): [number, number] {
        const totalOff = off.i + off.c;
        const infantryPart = roundPercent(off.i / totalOff);
        const cavalryPart = roundPercent(off.c / totalOff);
        const totalDef = def.i * infantryPart + def.c * cavalryPart;
        return [totalOff, totalDef];
    },
    /** returns how many levels of wall was demolished */
    demolishWall(tribeDur: number, level: number, points: number): number {
        const row = earlyRamTable[level];
        let dem = 0;
        while (Math.floor(tribeDur * row[dem+1]) <= points) dem++;
        return dem;
    },
    wallDurability(tribeDur: number, level: number, levelDec: number): number {
        let points;
        if (levelDec <= level / 2) {
            points = -2 * levelDec ** 2 + (2 * level + 1) * levelDec;
        } else {
            const base = level * (level + 1) / 2 + 20;
            const dl = levelDec - Math.floor(level / 2) - 1;
            points = 1.25 * dl**2 + 49.75 * dl + base;
        }
        return Math.floor(tribeDur * points) + 0.5;
    },
    immensity(n: number) {
        return compose(
            roundP(0.0002),
            limit(1.2578, 1.5),
            (n: number) => 3.7184 - 2 * n ** 0.015
        )(n);
    },
    raid(x: number): [number, number] {
        return [1 / (1 + x), x / (1 + x)];
    },
    sigma(x: number) {
        return (x > 1 ? 2 - x ** -1.5 : x ** 1.5) / 2;
    },
    siegeUpgrade(level: number): number {
        return roundP(0.005)(1.0205 ** level);
    },
    demolish(level: number, damage: number) {
        damage -= 0.5;
        if (damage < 0) return level;
        while (damage >= level && level) damage -= level--;
        return level;
    },
    demolishPoints(catas: number, upg: number, durability: number, ptsRatio: number, morale: number = 1) {
        // D = 4σ∙C – ½
        const effCatas = Math.floor(catas / durability) * morale;
        return 4 * this.sigma(ptsRatio) * effCatas * this.siegeUpgrade(upg);
    },
}
