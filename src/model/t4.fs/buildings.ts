import { extend } from '../../utils';

import { time, building, slots3, percent, ID } from '../base/buildings';
import buildings, { wall4 } from '../t4/buildings';

const STONE_WALL = 41;
const MAKESHIFT_WALL = 42;
const COMMAND_CENTER = 43;
const WATERWORKS = 44;
Object.assign(ID, { STONE_WALL, MAKESHIFT_WALL, COMMAND_CENTER, WATERWORKS })

export default extend(buildings, {
    [ID.RESIDENCE]:     { b: {[COMMAND_CENTER]: -1} },
    [ID.PALACE]:        { b: {[COMMAND_CENTER]: -1} },
    [STONE_WALL]:    building({id: STONE_WALL,    c: [ 110, 160,  70,  60], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:6}, f: wall4(1.025, 8), s:33, nt: 'b_42_t4', dt: 'b_42_t4' }),
    [MAKESHIFT_WALL]:building({id: MAKESHIFT_WALL,c: [  50,  80,  40,  30], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:7}, f: wall4(1.015, 6), s:33, nt: 'b_43_t4', dt: 'b_43_t4' }),
    [COMMAND_CENTER]:building({id: COMMAND_CENTER,c: [1600,1250,1050, 200], k: 1.22, u: 1, cp:2, t:time( 3875), m:20, e:9, y:3, r: {r:7}, b: {[ID.MAIN_BUILDING]:5, [ID.RESIDENCE]:-1, [ID.PALACE]:-1}, f: slots3 }),
    [WATERWORKS]:    building({id: WATERWORKS,    c: [ 650, 670, 650, 240], k: 1.28, u: 1, cp:1, t:time( 3875), m:20, e:2, y:1, r: {r:6}, b: {[ID.HERO_MANSION]:10}, f: percent(5) })
});