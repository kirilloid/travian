import { roundP } from '../../utils';

export const time = (a, k = 1.16, b = 1875) => (level) =>
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
        v: version
        r: race
	b: required buildings
	f: benefit
    dt: description translation
    
	*/
export const percent = m => lvl => m * lvl;
export const prod = lvl => [2,
	5, 9, 15, 22, 33, 50, 70, 100, 145, 200,
	280, 375, 495, 635, 800, 1000, 1300, 1600, 2000, 2450, 3050][lvl];
const capacity = lvl => roundP(100)(2120 * 1.2 ** lvl - 1320);
const cranny = lvl => roundP(10)(129.17 ** (lvl-1));
const wall = (base) => (lvl) => ({ defBonus: roundP(0.001)(base ** lvl) });
const p5 = percent(5);
const p10 = percent(10);
const train = lvl => 0.9 ** (lvl - 1);
const mb_like = lvl => 0.964 ** (lvl - 1);
const id = lvl => lvl;
export const slots2 = lvl => (lvl >= 10) + (lvl >= 20);
export const slots3 = lvl => (lvl >= 10) + (lvl >= 15) + (lvl >= 20);
const residence = lvl => ({ slots: slots2(lvl), def: 2 * lvl ** 2 });
const palace = lvl => ({ slots: slots3(lvl), def: 2 * lvl ** 2 });

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
	STONEMASON: 33,
	BREWERY: 34,
	TRAPPER: 35,
	HERO_MANSION: 36,
	GREAT_WAREHOUSE: 37,
	GREAT_GRANARY: 38,
	WORLD_WONDER: 39,
	HORSE_POOL: 40,
};

const round5 = roundP(5);
export class Building {
	constructor(config) {
		Object.assign(this, config);
	}
	get maxLevel () {
		return this.m;
	}
	time(lvl) {
		return this.t(lvl);
	}
	cost(lvl) {
		return this.c.map(res => round5(res * this.k ** (lvl - 1)));
	}
	upkeep(lvl) {
		return lvl === 1 ? this.u : Math.round((5 * this.u + lvl - 1) / 10);
	}
	culture(lvl) {
		return Math.round(this.cp * 1.2 ** lvl);
	}
	benefit(lvl) {
		return this.f(lvl);
	}
	nameKey() {
		return 'objects.buildings.names.' + (this.nt || 'b_' + (this.id + 1));
	}
	descriptionKey() {
		return 'objects.buildings.descriptions.' + (this.dt || 'b_' + (this.id + 1));
	}
}
export default [
	new Building({id: ID.WOODJACK, 		c: [  40, 100,  50,  60], k: 1.67, u: 2, cp:1, t:time(1780/3,1.6, 1000/3),m:20, e:1, y:1, r: {c: 10}, f: prod}),
	new Building({id: ID.CLAYPIT, 		c: [  80,  40,  80,  50], k: 1.67, u: 2, cp:1, t:time(1660/3,1.6, 1000/3),m:21, e:1, y:1, r: {c: 10}, f: prod}),
	new Building({id: ID.IRONMINE,		c: [ 100,  80,  30,  60], k: 1.67, u: 3, cp:1, t:time(2350/3,1.6, 1000/3),m:20, e:1, y:1, r: {c: 10}, f: prod}),
	new Building({id: ID.CROPLAND, 		c: [  70,  90,  70,  20], k: 1.67, u: 0, cp:1, t:time(1450/3,1.6, 1000/3),m:21, e:1, y:1, r: {c: 10}, f: prod}),
	new Building({id: ID.SAWMILL, 		c: [ 520, 380, 290,  90], k: 1.80, u: 4, cp:1, t:time( 5400, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CLAYPIT]: 10, [ID.MAIN_BUILDING]:5}, f: p5}),
	new Building({id: ID.BRICKYARD, 	c: [ 440, 480, 320,  50], k: 1.80, u: 3, cp:1, t:time( 5240, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.WOODJACK]:10, [ID.MAIN_BUILDING]:5}, f: p5}),
	new Building({id: ID.IRONFOUNDRY, 	c: [ 200, 450, 510, 120], k: 1.80, u: 6, cp:1, t:time( 6480, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.IRONMINE]:10, [ID.MAIN_BUILDING]:5}, f: p5}),
	new Building({id: ID.GRAINMILL, 	c: [ 500, 440, 380,1240], k: 1.80, u: 3, cp:1, t:time( 4240, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CROPLAND]:5,  [ID.MAIN_BUILDING]:5}, f: p5}),
	new Building({id: ID.BAKERY, 		c: [1200,1480, 870,1600], k: 1.80, u: 4, cp:1, t:time( 6080, 1.5,  2400), m:5,  e:2, y:1, b: {[ID.CROPLAND]:10, [ID.GRAINMILL]:5, [ID.MAIN_BUILDING]:5}, f: p5}),
	new Building({id: ID.WAREHOUSE, 	c: [ 130, 160,  90,  40], k: 1.28, u: 1, cp:1, t:time( 3875),             m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:1}, r:{m:true}, f: capacity}),
	new Building({id: ID.GRANARY, 		c: [  80, 100,  70,  20], k: 1.28, u: 1, cp:1, t:time( 3475),             m:20, e:3, y:1, b: {[ID.MAIN_BUILDING]:1}, r:{m:true}, f: capacity}),
	new Building({id: ID.ARMORY, 		c: [ 170, 200, 380, 130], k: 1.28, u: 4, cp:2, t:time( 3875),             m:20, e:12,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.ACADEMY]:3}, f: mb_like}),
	new Building({id: ID.BLACKSMITH,	c: [ 130, 210, 410, 130], k: 1.28, u: 4, cp:2, t:time( 3875),             m:20, e:12,y:2, b: {[ID.MAIN_BUILDING]:3, [ID.ACADEMY]:1}, f: mb_like}),
	new Building({id: ID.ARENA, 		c: [1750,2250,1530, 240], k: 1.28, u: 1, cp:1, t:time( 5375),             m:20, e:4, y:2, b: {[ID.RALLY_POINT]:15}, f: p10}),
	new Building({id: ID.MAIN_BUILDING, c: [  70,  40,  60,  20], k: 1.28, u: 2, cp:2, t:time( 3875),             m:20, e:7, y:3, f: mb_like}),
	new Building({id: ID.RALLY_POINT, 	c: [ 110, 160,  90,  70], k: 1.28, u: 1, cp:1, t:time( 3875),             m:20, e:13,y:2, f: id}),
	new Building({id: ID.MARKETPLACE, 	c: [  80,  70, 120,  70], k: 1.28, u: 4, cp:3, t:time( 3675),             m:20, e:14,y:3, b: {[ID.MAIN_BUILDING]:3, [ID.WAREHOUSE]:1, [ID.GRANARY]:1}, f: id}),
	new Building({id: ID.EMBASSY, 		c: [ 180, 130, 150,  80], k: 1.28, u: 3, cp:4, t:time( 3875),             m:20, e:8, y:3, b: {[ID.MAIN_BUILDING]:1}, f: id}),
	new Building({id: ID.BARRACKS, 		c: [ 210, 140, 260, 120], k: 1.28, u: 4, cp:1, t:time( 3875),             m:20, e:7, y:2, b: {[ID.MAIN_BUILDING]:3, [ID.RALLY_POINT]:1}, f: train}),
	new Building({id: ID.STABLES, 		c: [ 260, 140, 220, 100], k: 1.28, u: 5, cp:2, t:time( 4075),             m:20, e:7, y:2, b: {[ID.ARMORY]:3, [ID.ACADEMY]:5}, f: train}),
	new Building({id: ID.WORKSHOP, 		c: [ 460, 510, 600, 320], k: 1.28, u: 3, cp:3, t:time( 4875),             m:20, e:7, y:2, b: {[ID.MAIN_BUILDING]:5, [ID.ACADEMY]:10}, f: train}),
	new Building({id: ID.ACADEMY, 		c: [ 220, 160,  90,  40], k: 1.28, u: 4, cp:4, t:time( 3875),             m:20, e:0, y:2, b: {[ID.MAIN_BUILDING]:3, [ID.BARRACKS]:3}}),
	new Building({id: ID.CRANNY, 		c: [  40,  50,  30,  10], k: 1.28, u: 0, cp:1, t:time( 2625),             m:10, e:3, y:3, r: {m:true}, f: cranny}),
	new Building({id: ID.TOWNHALL, 		c: [1250,1110,1260, 600], k: 1.28, u: 4, cp:5, t:time(14375),             m:20, e:0, y:3, b: {[ID.MAIN_BUILDING]:10, [ID.ACADEMY]:10}}),
	new Building({id: ID.RESIDENCE, 	c: [ 580, 460, 350, 180], k: 1.28, u: 1, cp:2, t:time( 3875),             m:20, e:9, y:3, b: {[ID.MAIN_BUILDING]:5, [ID.PALACE]:-1}, f: residence}),
	new Building({id: ID.PALACE, 		c: [ 550, 800, 750, 250], k: 1.28, u: 1, cp:5, t:time( 6875),             m:20, e:9, y:3, b: {[ID.MAIN_BUILDING]:5, [ID.EMBASSY]:1, [ID.RESIDENCE]:-1}, f: palace}),
	new Building({id: ID.TREASURY, 		c: [2880,2740,2580, 990], k: 1.26, u: 4, cp:6, t:time( 9875),             m:20, e:15,y:3, b: {[ID.MAIN_BUILDING]:10, [ID.WORLD_WONDER]:-1}, f: slots2}),
	new Building({id: ID.TRADE_OFFICE,  c: [1400,1330,1200, 400], k: 1.28, u: 3, cp:3, t:time( 4875),             m:20, e:3, y:3, b: {[ID.MARKETPLACE]:20, [ID.STABLES]:10}, f: p10}),
	new Building({id: ID.GREAT_BARRACKS,c: [ 630, 420, 780, 360], k: 1.28, u: 4, cp:1, t:time( 3875),             m:20, e:7, y:2, b: {[ID.BARRACKS]:20}, r:{c:-1}, f: train}),
	new Building({id: ID.GREAT_STABLES, c: [ 780, 420, 660, 300], k: 1.28, u: 5, cp:2, t:time( 4075),             m:20, e:7, y:2, b: {[ID.STABLES]:20}, r:{c:-1}, f: train}),
	new Building({id: ID.CITY_WALL, 	c: [  70,  90, 170,  70], k: 1.28, u: 0, cp:1, t:time( 3875),             m:20, e:9, y:2, r: {r:1}, f: wall(1.03)}),
	new Building({id: ID.EARTH_WALL, 	c: [ 120, 200,   0,  80], k: 1.28, u: 0, cp:1, t:time( 3875),             m:20, e:9, y:2, r: {r:2}, f: wall(1.02)}),
	new Building({id: ID.PALISADE, 		c: [ 160, 100,  80,  60], k: 1.28, u: 0, cp:1, t:time( 3875),             m:20, e:9, y:2, r: {r:3}, f: wall(1.025)}),
];