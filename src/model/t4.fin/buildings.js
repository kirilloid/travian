import { extend } from '../../utils';

import { ID } from '../base/buildings';
import buildings from '../t4/buildings';

const f = buildings[ID.TRADE_OFFICE].f;
export default extend(buildings, {
    [ID.TRADE_OFFICE]: { f: l => f(l) * 2 }
});