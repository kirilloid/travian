import { extend } from '../../utils';

import { ID, Building, time, percent } from '../base/buildings';
import buildings from '../t3/buildings';

ID.HORSE_POOL = 40;

export default extend(buildings, {
    [ID.HORSE_POOL]:    new Building({ id: ID.HORSE_POOL,   c: [ 780, 420, 660, 540],     k: 1.28, u: 5, cp:3, t:time( 5950,2),          m:20, e:7, y:3, b: {[ID.RALLY_POINT]:10, [ID.STABLES]:20}, r:{r:1}, f: percent(1)}),
});