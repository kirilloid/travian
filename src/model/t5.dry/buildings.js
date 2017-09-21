import { extend } from '../../utils';

import buildings from '../t5/buildings';

export default extend(buildings, {
    // cropland
    3: { c: [ 112.5, 135, 130, 0] },
    // grain mill
    7: { c: [ 750, 660, 570,1860] },
    // bakery
    8: { c: [1800,2220,1305,2400] }
});
