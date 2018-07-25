import { extend, toObjArray } from '../../utils';

import { ID } from '../base/buildings';
import buildings from '../t4/buildings';

const f = buildings[ID.TRADE_OFFICE].f;

export default extend(buildings, {
    [ID.TRADE_OFFICE]: { f: (l: number) => (<number><any>f(l)) * 2 }
});