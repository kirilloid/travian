import { extend, roundP } from '../../utils';

import { time, prod, ID } from '../base/buildings';
import buildings from '../t3.6/buildings';

export const wall4 = (base, num) =>
    lvl => ({
        defBonus: roundP(0.001)(base ** lvl),
        def: num * lvl
    });

const prod4 = lvl => Math.round(prod(lvl) * 1.4);

export default extend(buildings, {
    [ID.CLAYPIT]:   { f: prod4 },
    [ID.WOODJACK]:  { f: prod4 },
    [ID.IRONMINE]:  { f: prod4 },
    [ID.CROPLAND]:  { f: prod4 },
    [ID.ARMORY]: undefined,
    [ID.BLACKSMITH]:{ c: [180, 250, 500, 160], nt:'b_13s', dt:'b_13s_desc' },
    [ID.BARRACKS]:  { b: {[ID.BLACKSMITH]:3, [ID.ACADEMY]:5}},
    [ID.CRANNY]:    { t: time(2175, 1.16, 1875), dt: 'b_23_desc_t4' },
    [ID.CITY_WALL]: { f: wall4(1.030,10) },
    [ID.EARTH_WALL]:{ f: wall4(1.020, 6) },
    [ID.PALISADE]:  { f: wall4(1.025, 8) },
    [ID.STONEMASON]:{ b: {[ID.MAIN_BUILDING]:5}},
    [ID.HERO_MANSION]:{c:[80, 120, 70, 90]},
});


