import { extend } from '../../utils';

import { time, building, slots3, percent, SLOT } from '../base/buildings';
import buildings, { wall4, ID as bID } from '../t4/buildings';
import TRIBES from './tribes';

export const ID = Object.assign(bID, {
    STONE_WALL: 41,
    MAKESHIFT_WALL: 42,
    COMMAND_CENTER: 43,
    WATERWORKS: 44,
});

export default extend(buildings, {
    [ID.RESIDENCE]:     { b: {[ID.COMMAND_CENTER]: -1} },
    [ID.PALACE]:        { b: {[ID.COMMAND_CENTER]: -1} },
    [ID.STONE_WALL]:    building({id: ID.STONE_WALL,    c: [ 110, 160,  70,  60], k: 1.28, u: 0, cp:1, t:time( 3875), e:9, y:2, r: {r:TRIBES.EGYPTIANS}, f: wall4(1.025, 8), d:5, s: SLOT.WALL, nt: 'b_42_t4', dt: 'b_42_t4' }),
    [ID.MAKESHIFT_WALL]:building({id: ID.MAKESHIFT_WALL,c: [  50,  80,  40,  30], k: 1.28, u: 0, cp:1, t:time( 3875), e:9, y:2, r: {r:TRIBES.HUNS},      f: wall4(1.015, 6), d:1, s: SLOT.WALL, nt: 'b_43_t4', dt: 'b_43_t4' }),
    [ID.COMMAND_CENTER]:building({id: ID.COMMAND_CENTER,c: [1600,1250,1050, 200], k: 1.22, u: 1, cp:2, t:time( 3875), e:9, y:3, r: {r:TRIBES.EGYPTIANS}, f: slots3,     b: {[ID.MAIN_BUILDING]:5, [ID.RESIDENCE]:-1, [ID.PALACE]:-1} }),
    [ID.WATERWORKS]:    building({id: ID.WATERWORKS,    c: [ 650, 670, 650, 240], k: 1.28, u: 1, cp:1, t:time( 3875), e:2, y:1, r: {r:TRIBES.HUNS},      f: percent(5), b: {[ID.HERO_MANSION]:10} }),
});
