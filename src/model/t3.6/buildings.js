import { extend } from '../../utils';

import buildings, { time, Building, slots2, slots3, capacity, percent, ID } from '../base/buildings';

const greatCapacity = lvl => 3 * capacity(lvl);
const ww = lvl => (lvl >= 0) + (lvl >= 50);

var t3buildings = extend(buildings, {
    [ID.STONEMASON]:    new Building({c: [ 155, 130, 125,  70],     k: 1.28, u: 2, cp:1, t:time( 5950,2),          m:20, e:5, y:2, b: {[ID.MAIN_BUILDING]:5, [ID.PALACE]:3}, r:{c:1}, f: percent(10)}),
    [ID.BREWERY]:       new Building({c: [1460, 930,1250,1740],     k: 1.40, u: 6, cp:4, t:time(11750,2),          m:10, e:6, y:3, b: {11:20, [ID.RALLY_POINT]:10}, r:{r:2}, f: percent(1)}),
    [ID.TRAPPER]:       new Building({c: [ 100, 100, 100, 100],     k: 1.28, u: 4, cp:1, t:time( 2000,0),          m:20, e:10,y:2, b: {[ID.RALLY_POINT]:1}, r:{r:3, m:true}}),
    [ID.HERO_MANSION]:  new Building({c: [ 700, 670, 700, 240],     k: 1.33, u: 2, cp:1, t:time( 2300,0),          m:20, e:11,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.RALLY_POINT]:1}, f: slots3}),
    [ID.GREAT_WAREHOUSE]:new Building({c:[ 650, 800, 450, 200],     k: 1.28, u: 1, cp:1, t:time(10875),            m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:10}, r:{m:true}, f: greatCapacity}),
    [ID.GREAT_GRANARY]: new Building({c: [ 400, 500, 350, 100],     k: 1.28, u: 1, cp:1, t:time( 8875),            m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:10}, r:{m:true}, f: greatCapacity}),
    [ID.WORLD_WONDER]:  new Building({c:[66700,69050,72200,13200],  k:1.0275,u: 1, cp:0, t:time(60857,1.014,42857),m:100,e:0, y:3, r: {c:-1}, f: ww}),
    [ID.HORSE_POOL]:    new Building({c: [ 780, 420, 660, 540],     k: 1.28, u: 5, cp:3, t:time( 5950,2),          m:20, e:7, y:3, b: {[ID.RALLY_POINT]:10, [ID.STABLES]:20}, r:{r:1}, f: percent(1)}),
});
t3buildings[ID.WORLD_WONDER].getCost = function getCost(level) {
    if (level === 100) return [1e6, 1e6, 1e6, 193630];
    return Building.prototype.getCost.call(this).map(r => Math.min(r, 1e6));
};

export default t3buildings;