import { extend } from '../../utils';

import { building, Building, time, percent, slots2 } from '../base/buildings';
import buildings, { ID as bID } from '../t3.1/buildings';
import TRIBES from '../t3/tribes';

const traps = (lvl: number) => lvl > 10
    ? (lvl*lvl + 19*lvl + 20) / 2
    : (lvl*lvl + 21*lvl - 2) / 2;

export const ID = Object.assign(bID, {
    TREASURY: 26,
    BREWERY: 34,
    HORSE_POOL: 40,
});

export default extend(buildings, {
    [ID.TREASURY]:      building({id: ID.TREASURY, 		c: [2880,2740,2580, 990], k: 1.26, u: 4, cp:6, t:time( 9875),   e:15,y:3, b: {[ID.MAIN_BUILDING]:10, [ID.WORLD_WONDER]:-1}, f: slots2}),
    [ID.BREWERY]:       building({ id: ID.BREWERY,      c: [1460, 930,1250,1740], k: 1.40, u: 6, cp:4, t:time(11750,2), e:6, y:3, b: {[ID.ARMORY]:20, [ID.RALLY_POINT]:10}, r:{r:TRIBES.TEUTONS}, m:10, f: percent(1)}),
    [ID.TRAPPER]:       { f: traps },
    [ID.HORSE_POOL]:    building({ id: ID.HORSE_POOL,   c: [ 780, 420, 660, 540], k: 1.28, u: 5, cp:3, t:time( 5950,2), e:7, y:3, b: {[ID.RALLY_POINT]:10, [ID.STABLES]:20}, r:{r:TRIBES.ROMANS}, f: percent(1)}),
}) as Building[];
