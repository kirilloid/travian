import { roundP } from '../../utils';

import { Unit } from '../base';

const round = roundP(1e-4);

export function upgrade(unit: Unit, stat: number, level: number) {
    const upkeep = unit.u / 1.007;
    return round(stat + (stat + 300 * upkeep / 7) * (1.007 ** level - 1) + upkeep * 0.0021);
}
