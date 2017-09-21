import { extend } from '../../utils';

import { buildings } from '../t4/buildings';

class TimeT5 {
    valueOf(lvl) {
        return this.b * this.m[lvl-1] + this.e;
    };
}
class TimeT5a extends TimeT5 {
    constructor(b) {
        super();
        this.b = b;
        this.e = 0;
    }
}
TimeT5a.prototype.m = [1, 4.5, 15, 60, 120, 240, 360, 720, 1080, 1620, 2160, 2700, 3240, 3960, 4500, 5400, 7200, 9000, 10800, 14400];

// most buildings
class TimeT5b extends TimeT5 {
    constructor(b, e = 0) {
        super();
        this.b = b;
        this.e = e;
    }
}
TimeT5b.prototype.m = [3, 22.5, 48, 90, 210, 480, 720, 990, 1200, 1380, 1680, 1980, 2340, 2640, 3060, 3420, 3960, 4680, 5400, 6120];

// factories
class TimeT5c extends TimeT5 {
    constructor(e = 0) {
        super();
        this.b = 60;
        this.e = e;
    }
}
TimeT5c.prototype.m = [8, 25, 55, 140, 240];

// wonder of the world
class TimeT5w extends TimeT5 {
    constructor() {
        super();
        this.b = 300;
        this.e = 0;
    }
}
TimeT5w.prototype.m = [12,16,20,24,28,32,36,40,44,46,46,47,48,48,49,50,51,51,52,53,54,55,57,58,59,60,62,63,64,66,67,69,70,72,74,75,77,79,81,83,85,87,89,91,93,96,98,100,103,105,107,110,113,115,118,121,123,126,129,132,135,138,141,144,147,150,154,157,160,164,167,171,174,178,181,185,189,193,196,200,204,208,212,216,220,225,229,233,237,242,246,251,255,260,264,269,274,278,288,576];

export default extend(buildings, [
    { t: new TimeT5a(24) },
    { t: new TimeT5a(22), m: 20 },
    { t: new TimeT5a(30) },
    { t: new TimeT5a(20),   c: [  75,  90,  85,   0], m: 20 },
    { t: new TimeT5c(), },
    { t: new TimeT5c(), },
    { t: new TimeT5c(), },
    { t: new TimeT5c(), },
    { t: new TimeT5c(300), },
    { t: new TimeT5b(11.5), c: [ 140, 180, 100,   0], k: 1.33 },
    { t: new TimeT5b(11),   c: [  80, 100,  70,  20], k: 1.33 },
    undefined, // old armory
    { t: new TimeT5b(13.3), c: [ 180, 250, 500, 160], nt: 'b_13s', dt:'b_13s_desc' },
    { t: new TimeT5b(26.1, 300) },
    { t: new TimeT5b(10.8), k: 1.33 },
    { t: new TimeT5b(11.5), k: 1.33 },
    { t: new TimeT5b(11.2) },
    { t: new TimeT5b(11.8), c: [ 700, 670, 700, 240], k: 1.33, c1:[ 180, 130, 150,  80], e: 11 },
    { t: new TimeT5b(12),   k: 1.33 },
    { t: new TimeT5b(13),   k: 1.33 },
    { t: new TimeT5b(15.5, 600) },
    { t: new TimeT5b(11.7), k: 1.33 },
    { t: new TimeT5b(3.3) },
    { t: new TimeT5b(21.9, 600) },
    { t: new TimeT5b(14.6, 1300) },
    { t: new TimeT5b(16.7, 3600) },
    { t: new TimeT5b(22.9, 2000), c: [1440,1370,1290, 495], c1: [ 720, 685, 645, 250], b: { 15: 3 } },
    { t: new TimeT5b(22.2, 300) },
    { t: new TimeT5b(16.3, 600) },
    { t: new TimeT5b(16.2, 600) },
    { t: new TimeT5b(11.4) },
    { t: new TimeT5b(11.4) },
    { t: new TimeT5b(11.4) },
    { t: new TimeT5b(11.6) },
    { t: new TimeT5b(25, 600), k: 1.28, maxLvl: 20 },
    { t: new TimeT5b(11.3), c: [  80, 120,  70,  90], k: 1.33 },
    undefined,
    { t: new TimeT5b(16.1, 600) },
    { t: new TimeT5b(14, 600) },
    { t: new TimeT5w(), c100: undefined },
    { t: new TimeT5b(16.9, 600) },
    { c: [ 740, 850, 960, 620], k:1.28, u:4, cp:3, t:new TimeT5b(19, 300), m:20, e:9, y:3, b: {16:10, 20:20}}
]);
