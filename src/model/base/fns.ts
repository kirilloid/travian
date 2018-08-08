import { roundP, limit, compose } from '../../utils';

import { CombatPoints } from '../types';

const roundPercent = roundP(1e-4);

export default {
    morale(offPop: number, defPop: number, ptsRatio = 1) {
        if (offPop <= defPop) { return 1; }
        const popRatio = offPop / Math.max(defPop, 3);
        return Math.max(0.667, roundP(1e-3)(popRatio ** (-0.2 * Math.min(ptsRatio, 1))));
    },
    cataMorale(offPop: number, defPop: number) {
        return limit(0.3333, 1)((offPop / defPop) ** -0.3);
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
    demolish(level: number, damage: number) {
        damage -= 0.5;
        if (damage < 0) return level;
        while (damage >= level && level) damage -= level--;
        return level;
    },
    siegeUpgrade(level: number): number {
        return roundP(0.005)(1.0205 ** level);
    },
    demolishPoints(catas: number, upg: number, durability: number, ptsRatio: number, morale: number) {
        // D = 4σ∙C – ½
        const effCatas = Math.floor(catas / durability) * morale;
        return 4 * this.sigma(ptsRatio) * effCatas * this.siegeUpgrade(upg);
    },
    adducedDef(off: CombatPoints, def: CombatPoints): [number, number] {
        const totalOff = off.i + off.c;
        const infantryPart = roundPercent(off.i / totalOff);
        const cavalryPart = roundPercent(off.c / totalOff);
        const totalDef = def.i * infantryPart + def.c * cavalryPart;
        return [totalOff, totalDef];
    },
}
