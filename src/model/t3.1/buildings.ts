import { extend } from '../../utils';

import { Building } from '../base/buildings';
import buildings, { ID as bID } from '../t3/buildings';

export const ID = bID;

export default extend(buildings, {
    [ID.STONEMASON]: { b: {[ID.MAIN_BUILDING]:5, [ID.PALACE]:3} },
}) as Building[];
