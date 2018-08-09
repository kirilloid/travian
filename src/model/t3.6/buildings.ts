import { extend } from '../../utils';

import { building, Building, time, percent } from '../base/buildings';
import buildings, { ID as bID } from '../t3.1/buildings';
import TRIBES from '../t3/tribes';

export const ID = Object.assign(bID, { HORSE_POOL: 40 });

export default extend(buildings, {
    [ID.HORSE_POOL]:    building({ id: ID.HORSE_POOL,   c: [ 780, 420, 660, 540],     k: 1.28, u: 5, cp:3, t:time( 5950,2), e:7, y:3, b: {[ID.RALLY_POINT]:10, [ID.STABLES]:20}, r:{r:TRIBES.ROMANS}, f: percent(1)}),
}) as Building[];
