import { roundP, limit, compose } from '../../utils';

const roundStat = roundP(1e-4);

export function upgrade(unit: { u: number }, stat: number, level: number) {
    const upkeep = unit.u;
    return roundStat(stat + (stat + 300 * upkeep / 7) * (1.007 ** level - 1));
}

export const immensity: (a: number) => number = compose(
    roundP(0.0002),
    limit(1.2578, 1.5),
    (n: number) => 3.7184 - 2 * n ** 0.015);

export const raid = (x: number): [number, number] => [1 / (1 + x), x / (1 + x)];

export const sigma = (x: number) => (x > 1 ? 2 - x ** -1.5 : x ** 1.5) / 2;

function cataUpgrade(level: number): number {
    return roundP(1e-2)(2 * 1.0205 ** level) / 2;
}

export function demolish(level: number, damage: number) {
    damage -= 0.5;
    if (damage < 0) return level;
    while (damage >= level && level) damage -= level--;
    return level;
}

export const demolishPoints = (catas: number, upg: number, durability: number, x: number) => {
    // D = 4σ∙C – ½
    const effCatas = Math.floor(catas / durability);
    return 4 * sigma(x) * effCatas * cataUpgrade(upg);
};
