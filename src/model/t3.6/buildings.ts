import { extend } from '../../utils';

import { ID, building, Building, time, percent } from '../base/buildings';
import buildings from '../t3/buildings';

const HORSE_POOL = 40;
Object.assign(ID, { HORSE_POOL });

export default extend(buildings, {
    [HORSE_POOL]:    building({ id: HORSE_POOL,   c: [ 780, 420, 660, 540],     k: 1.28, u: 5, cp:3, t:time( 5950,2),          m:20, e:7, y:3, b: {[ID.RALLY_POINT]:10, [ID.STABLES]:20}, r:{r:1}, f: percent(1)}),
}) as Building[];
