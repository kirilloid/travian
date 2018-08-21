import { extend } from '../../utils';

import { res } from '../types';

import { Building, ID } from '../base/buildings';
import buildings from '../t5/buildings';

function dryCost(this: Building, level: number): res {
    return this.constructor.prototype.cost.call(this, level)
        .map((r: number) => Math.floor(r * 1.5));
}

export default extend(buildings, {
    [ID.CROPLAND]:  { cost: dryCost },
    [ID.GRAINMILL]: { cost: dryCost },
    [ID.BAKERY]:    { cost: dryCost },
}) as Building[];
