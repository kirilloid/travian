import { extend } from '../../utils';

import { time, Building, slots3, percent, ID as _ID } from '../base/buildings';
import buildings, { wall4 } from '../t4/buildings';

export const ID = extend(_ID, {
    STONE_WALL: 41,
    MAKESHIFT_WALL: 42,
    COMMAND_CENTER: 43,
    WATERWORKS: 44,
});

export default extend(buildings, {
    [ID.STONE_WALL]:    new Building({c: [ 110, 160,  70,  60], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:6}, f: wall4(1.025, 8), dt: 'b_42_t4'}),
    [ID.MAKESHIFT_WALL]:new Building({c: [  50,  80,  40,  30], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:7}, f: wall4(1.015, 6) }),
    [ID.COMMAND_CENTER]:new Building({c: [1600,1250,1050, 200], k: 1.22, u: 1, cp:2, t:time( 3875), m:20, e:9, y:3, r: {r:7}, b: {15:5, 25:-1, 26:-1}, f: slots3 }),
    [ID.WATERWORKS]:    new Building({c: [ 650, 670, 650, 240], k: 1.28, u: 1, cp:1, t:time( 3875), m:20, e:2, y:1, r: {r:6}, b: {37:10}, f: percent(5) })
});