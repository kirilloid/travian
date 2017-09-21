import { extend } from '../../utils';

import { TimeT3 } from '../base/buildings';
import buildings from '../t3.6/buildings';

export function wall4() {

}

export default extend(buildings, {
    11: undefined,
    12: {c: [180, 250, 500, 160], nt:'b_13s', dt:'b_13s_desc' },
    19: {b: {13:3, 22:5}},
    22: {t: new TimeT3(2175, 1.16, 1875), dt: 'b_23_desc_t4' },
    30: {f: wall4(1.030,10) },
    31: {f: wall4(1.020, 6) },
    32: {f: wall4(1.025, 8) },
    33: {b: {15:5}},
    37: {c: [80, 120, 70, 90]},
    41: {f: wall4(1.025, 8) },
    42: {f: wall4(1.015, 6) }
});


