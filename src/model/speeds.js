import { extend } from '../utils';

export function units3x(allUnits) {
    return allUnits.map(raceUnits =>
        raceUnits.map(unit => 
            extend(unit, {
                t: unit.t / 3,
                rt: unit.rt / 3,
                v: unit.v * 2,
            })));
}

/*export function buildings3x(buildings) {
    return buildings.map(building =>
        extend(building, {  });
}*/