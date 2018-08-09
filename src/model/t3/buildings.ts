import { extend } from '../../utils';

import buildings, { time, building, slots2, slots3, capacity, percent, train, ID as bID, Building, BMethods } from '../base/buildings';
import TRIBES from './tribes';

const greatCapacity = (lvl: number) => 3 * capacity(lvl);
const ww = (lvl: number) => +(lvl >= 0) + +(lvl >= 50);
const traps = (lvl: number) => Math.max(Math.floor( (lvl-5) / 5), 0);

const wwTime = time(60857, 1.014, 42857);
function wwCost(this: Building, lvl: number) {
    if (lvl === 100) return [1e6, 1e6, 1e6, 193630];
    return BMethods.prototype.cost
        .call(this, lvl)
        .map((r: number) => Math.min(r, 1e6));    
}

export const ID = Object.assign(bID, {
	STONEMASON: 33,
    BREWERY: 34,
    TRAPPER: 35,
    HERO_MANSION: 36,
    GREAT_WAREHOUSE: 37,
    GREAT_GRANARY: 38,
    WORLD_WONDER: 39,
});


var t3buildings = extend(buildings, {
	[ID.TREASURY]:      building({id: ID.TREASURY, 		c: [2880,2740,2580, 990],   k: 1.26, u: 4, cp:6, t:time( 9875),     e:15,y:3, b: {[ID.MAIN_BUILDING]:10, [ID.WORLD_WONDER]:-1}, f: slots2}),
	[ID.TRADE_OFFICE]:  building({id: ID.TRADE_OFFICE,  c: [1400,1330,1200, 400],   k: 1.28, u: 3, cp:3, t:time( 4875),     e:3, y:3, b: {[ID.MARKETPLACE]:20, [ID.STABLES]:10}, f: percent(10)}),
	[ID.GREAT_BARRACKS]:building({id: ID.GREAT_BARRACKS,c: [ 630, 420, 780, 360],   k: 1.28, u: 4, cp:1, t:time( 3875),     e:7, y:2, b: {[ID.BARRACKS]:20}, r:{c:-1}, f: train}),
	[ID.GREAT_STABLES]: building({id: ID.GREAT_STABLES, c: [ 780, 420, 660, 300],   k: 1.28, u: 5, cp:2, t:time( 4075),     e:7, y:2, b: {[ID.STABLES]:20}, r:{c:-1}, f: train}),
    [ID.STONEMASON]:    building({ id: ID.STONEMASON,   c: [ 155, 130, 125,  70],   k: 1.28, u: 2, cp:1, t:time( 5950,2),   e:5, y:2, b: {[ID.MAIN_BUILDING]:10, [ID.PALACE]:5}, r:{c:1}, f: percent(10)}),
    [ID.BREWERY]:       building({ id: ID.BREWERY,      c: [1460, 930,1250,1740],   k: 1.40, u: 6, cp:4, t:time(11750,2),   e:6, y:3, b: {[ID.ARMORY]:20, [ID.RALLY_POINT]:10}, r:{r:TRIBES.TEUTONS}, m:10, f: percent(1)}),
    [ID.TRAPPER]:       building({ id: ID.TRAPPER,      c: [ 100, 100, 100, 100],   k: 1.28, u: 4, cp:1, t:time( 2000,0),   e:10,y:2, b: {[ID.RALLY_POINT]:1}, r:{r:TRIBES.GAULS, m:true}, f: traps}),
    [ID.HERO_MANSION]:  building({ id: ID.HERO_MANSION, c: [ 700, 670, 700, 240],   k: 1.33, u: 2, cp:1, t:time( 2300,0),   e:11,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.RALLY_POINT]:1}, f: slots3}),
    [ID.GREAT_WAREHOUSE]:building({id: ID.GREAT_WAREHOUSE,c:[650,800, 450, 200],    k: 1.28, u: 1, cp:1, t:time(10875),     e:3, y:1, b: {[ID.MAIN_BUILDING]:10}, r:{m:true}, f: greatCapacity}),
    [ID.GREAT_GRANARY]: building({ id: ID.GREAT_GRANARY,c: [ 400, 500, 350, 100],   k: 1.28, u: 1, cp:1, t:time( 8875),     e:3, y:1, b: {[ID.MAIN_BUILDING]:10}, r:{m:true}, f: greatCapacity}),
    [ID.WORLD_WONDER]:  building({ id: ID.WORLD_WONDER, c:[66700,69050,72200,13200],k:1.0275,u: 1, cp:0, t:wwTime,          e:0, y:3, r: {c:-1}, m:100, f: ww, cost: wwCost }),
});

export default t3buildings as Building[];