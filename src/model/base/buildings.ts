import { roundP, extend } from '../../utils';

import { res } from '../types';

import TRIBES from './tribes';

export const time = (a: number, k = 1.16, b = 1875) => (level: number) =>
    a * k ** (level - 1) - b;
/*
    c: cost,
    k: cost multiplier
    u: upkeep (population)
    t: time,
    m: max level
    e: extra
    y: type
    r: requirements
        c: capital
        m: multi
        r: race
	b: required buildings
	f: benefit
    dt: description translation
    
	*/
export const percent = (m: number) => (lvl: number) => m * lvl;
export const prod = (lvl: number) => [2,
	5, 9, 15, 22, 33, 50, 70, 100, 145, 200,
	280, 375, 495, 635, 800, 1000, 1300, 1600, 2000, 2450, 3050][lvl];
export const capacity = (lvl: number) => roundP(100)(2120 * 1.2 ** lvl - 1320);
const cranny = (lvl: number) => roundP(10)(129.17 ** (lvl-1));
const wall = (base: number) => (lvl: number) => ({ defBonus: roundP(0.001)(base ** lvl) - 1 });
const p5 = percent(5);
const p10 = percent(10);
export const train = (lvl: number) => 0.9 ** (lvl - 1);
const mb_like = (lvl: number) => 0.964 ** (lvl - 1);
const id = (lvl: number) => lvl;
export const slots2 = (lvl: number) => +(lvl >= 10) + +(lvl >= 20);
export const slots3 = (lvl: number) => +(lvl >= 10) + +(lvl >= 15) + +(lvl >= 20);
const residence = (lvl: number) => ({ slots: slots2(lvl), def: 2 * lvl ** 2 });
const palace = (lvl: number) => ({ slots: slots3(lvl), def: 2 * lvl ** 2 });

export const ID = {
	WOODJACK: 0,
	CLAYPIT: 1,
	IRONMINE: 2,
	CROPLAND: 3,

	SAWMILL: 4,
	BRICKYARD: 5,
	IRONFOUNDRY: 6,
	GRAINMILL: 7,
	BAKERY: 8,

	WAREHOUSE: 9,
	GRANARY: 10,
	ARMORY: 11,
	BLACKSMITH: 12,
	ARENA: 13,
	MAIN_BUILDING: 14,
	RALLY_POINT: 15,
	MARKETPLACE: 16,
	EMBASSY: 17,
	BARRACKS: 18,
	STABLES: 19,
	WORKSHOP: 20,
	ACADEMY: 21,
	CRANNY: 22,
	TOWNHALL: 23,
	RESIDENCE: 24,
	PALACE: 25,
	TREASURY: 26,
	TRADE_OFFICE: 27,
	GREAT_BARRACKS: 28,
	GREAT_STABLES: 29,
	CITY_WALL: 30,
	EARTH_WALL: 31,
	PALISADE: 32,
};

type slot = number | [number, number];

export const SLOT: {[P: string]: slot} = {
	RES: [1, 18],
	RALLY: 32,
	WALL: 33,
}

export type BConfig = {
	id: number
	m: number   // max level
	c: res      // cost
	k: number   // cost growth base
	u: number   // upkeep/population base
	cp: number  // culture points base
	t: (l: number) => number // time
	f: (l: number) => any // benefit (numeric)
	e: number   // extra (benefit)
	y: number   // type (benefit)
	r?: { 		
		m?: true,	// can we have multiple instances of it
		r?: number, // race (tribe), 1-based
		c?: number  // limitations for capital, it's simpler to have it in the base type
	}
	b?: { [P: number]: number } // prerequisites: other buildings id -> level map
	nt?: string // name translation key override
	dt?: string // description translation key override
	s?: slot // does it belong to a specific slot
}

const round5 = roundP(5);
export class BMethods<C extends BConfig = BConfig> {
	constructor(config: C) {
		return Object.assign<BMethods<C>, C>(this, config);
	}
	get maxLevel(this: BMethods & C) {
		return this.m;
	}
	time(this: BMethods & C, lvl: number) {
		return this.t(lvl);
	}
	cost(this: BMethods & C, lvl: number): res {
		return <res>this.c.map((res: number) => round5(res * this.k ** (lvl - 1)));
	}
	upkeep(this: BMethods & C, lvl: number) {
		return lvl === 1 ? this.u : Math.round((5 * this.u + lvl - 1) / 10);
	}
	culture(this: BMethods & C, lvl: number) {
		return Math.round(this.cp * 1.2 ** lvl);
	}
	benefit(this: BMethods & C, lvl: number) {
		return this.f(lvl);
	}
	nameKey(this: BMethods & C) {
		return 'objects.buildings.names.' + (this.nt || 'b_' + (this.id + 1));
	}
	descriptionKey(this: BMethods & C) {
		return 'objects.buildings.descriptions.' + (this.dt || 'b_' + (this.id + 1));
	}
}
export function building(config: BConfig & Partial<Building>): Building {
	return Object.assign(
		Object.create(BMethods.prototype), config);
}
export type Building = BMethods & BConfig;
export default extend([
	building({id: ID.WOODJACK, 		c: [  40, 100,  50,  60], k: 1.67, u: 2, cp:1, t:time(1780/3,1.6, 1000/3),m:20, e:1, y:1, f: prod, s: SLOT.RES }),
	building({id: ID.CLAYPIT, 		c: [  80,  40,  80,  50], k: 1.67, u: 2, cp:1, t:time(1660/3,1.6, 1000/3),m:21, e:1, y:1, f: prod, s: SLOT.RES}),
	building({id: ID.IRONMINE,		c: [ 100,  80,  30,  60], k: 1.67, u: 3, cp:1, t:time(2350/3,1.6, 1000/3),m:20, e:1, y:1, f: prod, s: SLOT.RES}),
	building({id: ID.CROPLAND, 		c: [  70,  90,  70,  20], k: 1.67, u: 0, cp:1, t:time(1450/3,1.6, 1000/3),m:21, e:1, y:1, f: prod, s: SLOT.RES}),
	building({id: ID.SAWMILL, 		c: [ 520, 380, 290,  90], k: 1.80, u: 4, cp:1, t:time( 5400, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CLAYPIT]: 10, [ID.MAIN_BUILDING]:5}, f: p5}),
	building({id: ID.BRICKYARD, 	c: [ 440, 480, 320,  50], k: 1.80, u: 3, cp:1, t:time( 5240, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.WOODJACK]:10, [ID.MAIN_BUILDING]:5}, f: p5}),
	building({id: ID.IRONFOUNDRY, 	c: [ 200, 450, 510, 120], k: 1.80, u: 6, cp:1, t:time( 6480, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.IRONMINE]:10, [ID.MAIN_BUILDING]:5}, f: p5}),
	building({id: ID.GRAINMILL, 	c: [ 500, 440, 380,1240], k: 1.80, u: 3, cp:1, t:time( 4240, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CROPLAND]:5,  [ID.MAIN_BUILDING]:5}, f: p5}),
	building({id: ID.BAKERY, 		c: [1200,1480, 870,1600], k: 1.80, u: 4, cp:1, t:time( 6080, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CROPLAND]:10, [ID.GRAINMILL]:5, [ID.MAIN_BUILDING]:5}, f: p5}),
	building({id: ID.WAREHOUSE, 	c: [ 130, 160,  90,  40], k: 1.28, u: 1, cp:1, t:time( 3875),             m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:1}, r:{m:true}, f: capacity}),
	building({id: ID.GRANARY, 		c: [  80, 100,  70,  20], k: 1.28, u: 1, cp:1, t:time( 3475),             m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:1}, r:{m:true}, f: capacity}),
	building({id: ID.ARMORY, 		c: [ 170, 200, 380, 130], k: 1.28, u: 4, cp:2, t:time( 3875),             m:20, e:12,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.ACADEMY]:3}, f: mb_like}),
	building({id: ID.BLACKSMITH,	c: [ 130, 210, 410, 130], k: 1.28, u: 4, cp:2, t:time( 3875),             m:20, e:12,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.ACADEMY]:1}, f: mb_like}),
	building({id: ID.ARENA, 		c: [1750,2250,1530, 240], k: 1.28, u: 1, cp:1, t:time( 5375),             m:20, e:4, y:2, b: {[ID.RALLY_POINT]:15}, f: p10}),
	building({id: ID.MAIN_BUILDING, c: [  70,  40,  60,  20], k: 1.28, u: 2, cp:2, t:time( 3875),             m:20, e:7, y:3, f: mb_like}),
	building({id: ID.RALLY_POINT, 	c: [ 110, 160,  90,  70], k: 1.28, u: 1, cp:1, t:time( 3875),             m:20, e:13,y:2, f: id, s: SLOT.RALLY}),
	building({id: ID.MARKETPLACE, 	c: [  80,  70, 120,  70], k: 1.28, u: 4, cp:3, t:time( 3675),             m:20, e:14,y:3, b: {[ID.MAIN_BUILDING]:3, [ID.WAREHOUSE]:1, [ID.GRANARY]:1}, f: id}),
	building({id: ID.EMBASSY, 		c: [ 180, 130, 150,  80], k: 1.28, u: 3, cp:4, t:time( 3875),             m:20, e:8, y:3, b: {[ID.MAIN_BUILDING]:1}, f: id}),
	building({id: ID.BARRACKS, 		c: [ 210, 140, 260, 120], k: 1.28, u: 4, cp:1, t:time( 3875),             m:20, e:7, y:2, b: {[ID.MAIN_BUILDING]:3, [ID.RALLY_POINT]:1}, f: train}),
	building({id: ID.STABLES, 		c: [ 260, 140, 220, 100], k: 1.28, u: 5, cp:2, t:time( 4075),             m:20, e:7, y:2, b: {[ID.ARMORY]:3, [ID.ACADEMY]:5}, f: train}),
	building({id: ID.WORKSHOP, 		c: [ 460, 510, 600, 320], k: 1.28, u: 3, cp:3, t:time( 4875),             m:20, e:7, y:2, b: {[ID.MAIN_BUILDING]:5, [ID.ACADEMY]:10}, f: train}),
	building({id: ID.ACADEMY, 		c: [ 220, 160,  90,  40], k: 1.28, u: 4, cp:4, t:time( 3875),             m:20, e:0, y:2, b: {[ID.MAIN_BUILDING]:3, [ID.BARRACKS]:3}, f: mb_like}),
	building({id: ID.CRANNY, 		c: [  40,  50,  30,  10], k: 1.28, u: 0, cp:1, t:time( 2625),             m:10, e:3, y:3, r: {m:true}, f: cranny}),
	building({id: ID.TOWNHALL, 		c: [1250,1110,1260, 600], k: 1.28, u: 4, cp:5, t:time(14375),             m:20, e:0, y:3, b: {[ID.MAIN_BUILDING]:10, [ID.ACADEMY]:10}, f: mb_like}),
	building({id: ID.RESIDENCE, 	c: [ 580, 460, 350, 180], k: 1.28, u: 1, cp:2, t:time( 3875),             m:20, e:9, y:3, b: {[ID.MAIN_BUILDING]:5, [ID.PALACE]:-1}, f: residence}),
	building({id: ID.PALACE, 		c: [ 550, 800, 750, 250], k: 1.28, u: 1, cp:5, t:time( 6875),             m:20, e:9, y:3, b: {[ID.MAIN_BUILDING]:5, [ID.EMBASSY]:1, [ID.RESIDENCE]:-1}, f: palace}),
], {
	[ID.CITY_WALL]:     building({id: ID.CITY_WALL, 	c: [  70,  90, 170,  70],   k: 1.28, u: 0, cp:1, t:time( 3875),     m:20, e:9, y:2, r: {r:TRIBES.ROMANS}, f: wall(1.03), s: SLOT.WALL}),
	[ID.EARTH_WALL]:    building({id: ID.EARTH_WALL, 	c: [ 120, 200,   0,  80],   k: 1.28, u: 0, cp:1, t:time( 3875),     m:20, e:9, y:2, r: {r:TRIBES.TEUTONS}, f: wall(1.02), s: SLOT.WALL}),
	[ID.PALISADE]:      building({id: ID.PALISADE, 		c: [ 160, 100,  80,  60],   k: 1.28, u: 0, cp:1, t:time( 3875),     m:20, e:9, y:2, r: {r:TRIBES.GAULS}, f: wall(1.025), s: SLOT.WALL}),
}) as Building[];
