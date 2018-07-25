import { extend } from '../utils';

import { Unit } from './base';
import { Building } from './base/buildings';

const d3 = (x: number) => x / 3;
const m2 = (x: number) => x * 2;

export function units3x(allUnits: Unit[][]) {
    return allUnits.map(raceUnits =>
        raceUnits.map(unit => 
            extend(unit, { t: d3, rt: d3, v: m2 })));
}

export function buildings3x(buildings: Building[]) {
    return buildings.map(building =>
        extend(building, {
            t: (level: number) => building.t(level) / 3
        }));
}