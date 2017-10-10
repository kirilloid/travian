import { extend } from '../../utils';

import { time, Building, slots3, percent, ID } from '../base/buildings';
import buildings, { wall4 } from '../t4/buildings';

ID.STONE_WALL = 41;
ID.MAKESHIFT_WALL = 42;
ID.COMMAND_CENTER = 43;
ID.WATERWORKS = 44;

export default extend(buildings, {
    [ID.STONE_WALL]:    new Building({id: ID.STONE_WALL,    c: [ 110, 160,  70,  60], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:6}, f: wall4(1.025, 8), s:33, nt: 'b_42_t4', dt: 'b_42_t4' }),
    [ID.MAKESHIFT_WALL]:new Building({id: ID.MAKESHIFT_WALL,c: [  50,  80,  40,  30], k: 1.28, u: 0, cp:1, t:time( 3875), m:20, e:9, y:2, r: {r:7}, f: wall4(1.015, 6), s:33, nt: 'b_43_t4', dt: 'b_43_t4' }),
    [ID.RESIDENCE]:     { b: {[ID.COMMAND_CENTER]: -1} },
    [ID.PALACE]:        { b: {[ID.COMMAND_CENTER]: -1} },
    [ID.COMMAND_CENTER]:new Building({id: ID.COMMAND_CENTER,c: [1600,1250,1050, 200], k: 1.22, u: 1, cp:2, t:time( 3875), m:20, e:9, y:3, r: {r:7}, b: {[ID.MAIN_BUILDING]:5, [ID.RESIDENCE]:-1, [ID.PALACE]:-1}, f: slots3 }),
    [ID.WATERWORKS]:    new Building({id: ID.WATERWORKS,    c: [ 650, 670, 650, 240], k: 1.28, u: 1, cp:1, t:time( 3875), m:20, e:2, y:1, r: {r:6}, b: {[ID.HERO_MANSION]:10}, f: percent(5) })
});