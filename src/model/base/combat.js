import { roundP, limit, compose } from '../../utils';

const roundStat = roundP(1e-4);

export function upgrade(unit, stat, level) {
    const upkeep = unit.u;
    return roundStat(stat + (stat + 300 * upkeep / 7) * (1.007 ** level - 1));
}

export const immensity = compose(
    roundP(0.0002),
    limit(1.2578, 1.5),
    n => 3.7184 - 2 * n ** 0.015);

export const raid = x => [1 / (1 + x), x / (1 + x)];