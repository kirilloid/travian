import { extend } from '../../utils';

import { Building, ID } from '../base/buildings';
import buildings from '../t5/buildings';

function getDryCost(level) {
    return Building.prototype.cost.call(this, level)
        .map(r => Math.floor(r * 1.5));
}

export default extend(buildings, {
    [ID.CROPLAND]:  { cost: getDryCost },
    [ID.GRAINMILL]: { cost: getDryCost },
    [ID.BAKERY]:    { cost: getDryCost }
});
