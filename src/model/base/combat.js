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

export const sigma = x => (x > 1 ? 2 - x ** -1.5 : x ** 1.5) / 2;

function cataUpgrade(level) {
    return roundP(1e-2)(2 * 1.0205 ** level) / 2;
}

/**
 * 
 * @param {number} level start building level
 * @param {number} damage descruction points
 * @returns {number} final level
 */
export function demolish(level, damage) {
    damage -= 0.5;
    if (damage < 0) return level;
    while (damage >= level && level) damage -= level--;
    return level;
}

/**
 * 
 * @param {number} catas number of catapults
 * @param {number} upg upgrade level
 * @param {number} durability coefficient: artifact and stone mason
 * @param {number} x off/def points ratio
 * @returns {number} demolish points
 */
export const demolishPoints = (catas, upg, durability, x) => {
    // D = 4σ∙C – ½
    const effCatas = Math.floor(catas / durability);
    return 4 * sigma(x) * effCatas * cataUpgrade(upg);
};
