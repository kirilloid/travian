import { extend } from '../utils';

const d3 = x => x / 3;
const m2 = x => x * 2;

export function units3x(allUnits) {
    return allUnits.map(raceUnits =>
        raceUnits.map(unit => 
            extend(unit, { t: d3, rt: d3, v: m2 })));
}

export function buildings3x(buildings) {
    return buildings.map(building =>
        extend(building, {
            t: (level) => building.t(level) / 3
        }));
}