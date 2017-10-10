import { extend } from '../../utils';

import buildings, { Building, prod, ID as _ID } from '../base/buildings';
import t4buildings from '../t4/buildings';

export const ID = extend(_ID, {
    WATER_DITCH: 41,
    NATARIAN_WALL: 42,
});

const ditch = lvl => ({ defBonus: 1 + [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,23,25,30][lvl] / 100 });

const time = (base, extra) => mul => level =>
    base * mul[level-1] + extra;
const timeA = b => time(b, 0)([
    1, 4.5, 15, 60, 120, 240, 360, 720, 1080, 1620,
    2160, 2700, 3240, 3960, 4500, 5400, 7200, 9000, 10800, 14400]);

// most buildings
const timeB = base => time(base, 0)([
    3, 22.5, 48, 90, 210, 480, 720, 990, 1200, 1380,
    1680, 1980, 2340, 2640, 3060, 3420, 3960, 4680, 5400, 6120]);
// factories
const timeC = (extra = 0) => time(60, extra)([8, 25, 55, 140, 240]);

// wonder of the world
const timeW = () => time(300, 0)([
     12, 16, 20, 24, 28, 32, 36, 40, 44, 46,
     46, 47, 48, 48, 49, 50, 51, 51, 52, 53,
     54, 55, 57, 58, 59, 60, 62, 63, 64, 66,
     67, 69, 70, 72, 74, 75, 77, 79, 81, 83,
     85, 87, 89, 91, 93, 96, 98,100,103,105,
    107,110,113,115,118,121,123,126,129,132,
    135,138,141,144,147,150,154,157,160,164,
    167,171,174,178,181,185,189,193,196,200,
    204,208,212,216,220,225,229,233,237,242,
    246,251,255,260,264,269,274,278,288,576]);

function wwCost(level) {
    return Building.prototype.cost.call(this, level)
        .map(r => Math.min(r, 1e6));
}

function altCost(level) {
    return level === 1 ? this.c1 : Building.prototype.cost.call(this, level);
}

const t5buildings = extend(t4buildings, [
    { t: timeA(24), f: prod },
    { t: timeA(22), f: prod, m: 20 },
    { t: timeA(30), f: prod },
    { t: timeA(20), f: prod,  c: [  75,  90,  85,   0], m: 20 },
    { t: timeC(), },
    { t: timeC(), },
    { t: timeC(), },
    { t: timeC(), },
    { t: timeC(300), },
    { t: timeB(11.5), c: [ 140, 180, 100,   0], k: 1.33 },
    { t: timeB(11),   c: [  80, 100,  70,  20], k: 1.33 },
    , // old armory
    { t: timeB(13.3), c: [ 180, 250, 500, 160], nt: 'b_13s', dt:'b_13s_desc' },
    { t: timeB(26.1, 300) },
    { t: timeB(10.8), k: 1.33 },
    { t: timeB(11.5), k: 1.33 },
    { t: timeB(11.2) },
    { t: timeB(11.8), c: [ 700, 670, 700, 240], k: 1.33, c1: [ 180, 130, 150,  80], cost: altCost, e: 11 },
    { t: timeB(12),   k: 1.33 },
    { t: timeB(13),   k: 1.33 },
    { t: timeB(15.5, 600) },
    { t: timeB(11.7), k: 1.33 },
    { t: timeB(3.3) },
    { t: timeB(21.9, 600) },
    { t: timeB(14.6, 1300) },
    { t: timeB(16.7, 3600) },
    { t: timeB(22.9, 2000), c: [1440,1370,1290, 495], c1: [ 720, 685, 645, 250], cost: altCost, b: { 15: 3 } },
    { t: timeB(22.2, 300) },
    { t: timeB(16.3, 600) },
    { t: timeB(16.2, 600) },
    { t: timeB(11.4) },
    { t: timeB(11.4) },
    { t: timeB(11.4) },
    { t: timeB(11.6) },
    { t: timeB(25, 600), k: 1.28, m: 20 },
    { t: timeB(11.3), c: [  80, 120,  70,  90], k: 1.33 },
    , // hero mansion
    { t: timeB(16.1, 600) },
    { t: timeB(14, 600) },
    { t: timeW(), cost: wwCost }, // ww
    { t: timeB(16.9, 600) },
    // water ditch
    new Building({ id: ID.WATER_DITCH, c: [ 740, 850, 960, 620], k:1.28, u:4, cp:3, t:timeB(19, 300), m:20, e:9, y:3, b: {16:10, 20:20}, f: ditch, s:41}),
]);
t5buildings[ID.NATARIAN_WALL] = extend(t5buildings[ID.EARTH_WALL], {
    id: ID.NATARIAN_WALL,
    r: undefined
});

export default t5buildings;