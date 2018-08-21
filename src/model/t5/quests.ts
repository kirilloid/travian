import { ID } from '../base/buildings';

export default [
// Barbara
    { // each res 1
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 1 },
            [ID.WOODJACK]: { level: 1 },
            [ID.IRONMINE]: { level: 1 },
        } },
        bonus: { res: [150, 150, 100, 50] },
    },
    { // granary 1
        check: { buildings: { [ID.GRANARY]: { level: 1 } } },
        bonus: { res: [0, 0, 0, 500] },
    },
    { // all farms 1
        check: { buildings: { [ID.CROPLAND]: { level: 1, number: 6 } } },
        bonus: { res: [150, 150, 100, 50] },
    },
    { // warehouse 5
        check: { buildings: { [ID.WAREHOUSE]: { level: 1 } } },
        bonus: { res: [300, 300, 300, 0] },
    },
    { // clay pits level 1
        check: { buildings: { [ID.CLAYPIT]: { level: 1, number: 4 } } },
        bonus: { res: [150, 350, 50, 100] },
    },
    { // woodjacks level 1
        check: { buildings: { [ID.WOODJACK]: { level: 1, number: 4 } } },
        bonus: { res: [100, 250, 120, 150] },
    },
    { // iron mines level 1
        check: { buildings: { [ID.IRONMINE]: { level: 1, number: 4 } } },
        bonus: { res: [260, 210, 60, 150] },
    },
    { // all farms 2
        check: { buildings: { [ID.CROPLAND]: { level: 2, number: 6 } } },
        bonus: { res: [1000, 1400, 1000, 350] },
    },
    { // each res 2
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 2 },
            [ID.WOODJACK]: { level: 2 },
            [ID.IRONMINE]: { level: 2 },
        } },
        bonus: { res: [350, 350, 300, 300] },
    },
    { // all res 2
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 2, number: 4 },
            [ID.WOODJACK]: { level: 2, number: 4 },
            [ID.IRONMINE]: { level: 2, number: 4 },
        } },
        bonus: { res: [975, 1000, 1050, 750] },
    },
    { // all farms 3
        check: { buildings: { [ID.CROPLAND]: { level: 3, number: 6 } } },
        bonus: { res: [1200, 1500, 1200, 500] },
    },
    { // all res 3
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 3, number: 4 },
            [ID.WOODJACK]: { level: 3, number: 4 },
            [ID.IRONMINE]: { level: 3, number: 4 },
        } },
        bonus: { res: [1200, 1200, 1000, 750] },
    },
    { // warehouse 3
        check: { buildings: { [ID.WAREHOUSE]: { level: 3 } } },
        bonus: { res: [500, 600, 360, 0] },
    },
    { // farm 5
        check: { buildings: { [ID.CROPLAND]: { level: 5 } } },
        bonus: { res: [625, 800, 600, 200] },
    },
    { // granary 3
        check: { buildings: { [ID.GRANARY]: { level: 3 } } },
        bonus: { res: [300, 400, 250, 0] }, // ?
    },
    { // each res 5
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 5 },
            [ID.WOODJACK]: { level: 5 },
            [ID.IRONMINE]: { level: 5 },
        } },
        bonus: { res: [2400, 2400, 2400, 2400] },
    },
    { // mill
        check: { buildings: { [ID.GRAINMILL]: { level: 1 } } },
        bonus: { res: [0, 0, 0, 1400] },
    },
    { // warehouse 5
        check: { buildings: { [ID.WAREHOUSE]: { level: 5 } } },
        bonus: { res: [700, 800, 400, 0] },
    },
    { // all res 5
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 5, number: 4 },
            [ID.WOODJACK]: { level: 5, number: 4 },
            [ID.IRONMINE]: { level: 5, number: 4 },
        } },
        bonus: { res: [5000, 5000, 4000, 4000] },
    },
    { // granary 5
        check: { buildings: { [ID.GRANARY]: { level: 5 } } },
        bonus: { res: [300, 400, 250, 0] },
    },
    { // all farms 5
        check: { buildings: { [ID.CROPLAND]: { level: 5, number: 6 } } },
        bonus: { res: [3000, 4000, 3000, 1000] },
    },
    { // all res 7
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 7, number: 4 },
            [ID.WOODJACK]: { level: 7, number: 4 },
            [ID.IRONMINE]: { level: 7, number: 4 },
        } },
        bonus: { res: [11500, 12000, 8000, 7000] },
    },
    { // all farms 7
        check: { buildings: { [ID.CROPLAND]: { level: 7, number: 6 } } },
        bonus: { res: [5000, 6000, 5000, 1500] },
    },
    { // warehouse 10
        check: { buildings: { [ID.WAREHOUSE]: { level: 10 } } },
        bonus: { buildings: { [ID.WAREHOUSE]: 12 } },
    },
    { // granary 10
        check: { buildings: { [ID.GRANARY]: { level: 10 } } },
        bonus: { res: [500, 550, 400, 0] }, // ?
    },
    { // woodjack 10
        check: { buildings: { [ID.WOODJACK]: { level: 10 } } },
        bonus: { res: [2500, 6000, 3500, 4000] },
    },
    { // clay pit 10
        check: { buildings: { [ID.CLAYPIT]: { level: 10 } } },
        bonus: { res: [5000, 2500, 5000, 3333] },
    },
    { // iron mine 10
        check: { buildings: { [ID.IRONMINE]: { level: 10 } } },
        bonus: { res: [6000, 5000, 1500, 3500] },
    },
    { // sawmill
        check: { buildings: { [ID.SAWMILL]: { level: 1 } } },
        bonus: { res: [1000, 0, 0, 0] },
    },
    { // brickyard
        check: { buildings: { [ID.BRICKYARD]: { level: 1 } } },
        bonus: { res: [0, 1000, 0, 0] },
    },
    { // iron foundry
        check: { buildings: { [ID.IRONFOUNDRY]: { level: 1 } } },
        bonus: { res: [0, 0, 1000, 0] },
    },
    { // farm 10
        check: { buildings: { [ID.CROPLAND]: { level: 10 } } },
        bonus: { res: [4500, 5500, 4500, 1000] },
    },
    { // all res 10
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 10, number: 4 },
            [ID.WOODJACK]: { level: 10, number: 4 },
            [ID.IRONMINE]: { level: 10, number: 4 },
        } },
        bonus: { res: [30000, 30000, 20000, 25000] },
    },
    { // all farms 10
        check: { buildings: { [ID.CROPLAND]: { level: 10, number: 6 } } },
        bonus: { res: [25000, 30000, 25000, 7000] },
    },
    { // bakery
        check: { buildings: { [ID.BAKERY]: { level: 1 } } },
        bonus: { res: [0, 0, 0, 7000] },
    },
    { // all res 12
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 12, number: 4 },
            [ID.WOODJACK]: { level: 12, number: 4 },
            [ID.IRONMINE]: { level: 12, number: 4 },
        } },
        bonus: { res: [66000, 66000, 33000, 44000] },
    },
    { // all farms 12
        check: { buildings: { [ID.CROPLAND]: { level: 12, number: 6 } } },
        bonus: { res: [33000, 35000, 30000, 10000] },
    },
    { // all res 10 in 5
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 10, number: 20 },
            [ID.WOODJACK]: { level: 10, number: 20 },
            [ID.IRONMINE]: { level: 10, number: 20 },
        } },
        bonus: { res: [100000, 100000, 100000, 0] },
    },
    { // all farms 10 in 5
        check: { buildings: { [ID.CROPLAND]: { level: 12, number: 30 } } },
        bonus: { res: [0, 0, 0, 100000] },
    },
    { // all res 10 in 12
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 10, number: 48 },
            [ID.WOODJACK]: { level: 10, number: 48 },
            [ID.IRONMINE]: { level: 10, number: 48 },
        } },
        bonus: { res: [150000, 150000, 150000, 0] },
    },
    { // all farms 10 in 12
        check: { buildings: { [ID.CROPLAND]: { level: 12, number: 72 } } },
        bonus: { res: [0, 0, 0, 150000] },
    },

// Markus
    { // rename a village
        check: {  },
        bonus: { res: [50, 75, 25, 100] },
    },
    { // sell 1 value
        check: { values: 1 },
        bonus: { xp: 35 },
    },
    { // gather 1 tribute
        check: { tributes: 1 },
        bonus: { xp: 35 },
    },
    { // embassy 1
        check: { buildings: { [ID.EMBASSY]: { level: 1 } } },
        bonus: { res: [150, 100, 120, 60] },
    },
    { // catch animals
        check: { units: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49] },
        bonus: { res: [150, 200, 110, 90] },
    },
    { // barracks 3
        check: { buildings: { [ID.BARRACKS]: { level: 3 } } },
        bonus: { res: [600, 350, 700, 300] },
    },
    { // academy 1
        check: { buildings: { [ID.ACADEMY]: { level: 1 } } },
        bonus: { instantBuild: true },
    },
    { // 3 tributes
        check: { tributes: 3 },
        bonus: { xp: 50 },
    },
    { // 10 tributes
        check: { tributes: 10 },
        bonus: { xp: 100 },
    },
    { // 50 tributes
        check: { tributes: 50 },
        bonus: { xp: 200 },
    },
    { // 100 tributes
        check: { tributes: 100 },
        bonus: { xp: 300 },
    },
    { // 300 tributes
        check: { tributes: 300 },
        bonus: { xp: 400 },
    },
    { // 1000 tributes
        check: { tributes: 1000 },
        bonus: { xp: 500 },
    },
    { // 3000 tributes
        check: { tributes: 3000 },
        bonus: { xp: 1000 },
    },
    { // cranny
        check: { buildings: { [ID.CRANNY]: { level: 1 } } },
        bonus: { res: [70, 50, 50, 0] },
    },
    { // cranny 5
        check: { buildings: { [ID.CRANNY]: { level: 5 } } },
        bonus: { res: [150, 200, 115, 50] },
    },
    { // academy 5
        check: { buildings: { [ID.ACADEMY]: { level: 5 } } },
        bonus: { res: [1300, 1000, 600, 400] }, // crop = 300?
    },
    { // blacksmith 3
        check: { buildings: { [ID.BLACKSMITH]: { level: 3 } } },
        bonus: { res: [500, 700, 1000, 300] },
    },
    { // stables 1
        check: { buildings: { [ID.STABLES]: { level: 1 } } },
        bonus: { res: [200, 120, 150, 100] },
    },
    { // scout
        check: { units: [3, 12, 23] },
        bonus: { races: [
            { res: [600, 500, 200, 0] },
            { res: [700, 500, 300, 0] },
            { res: [700, 500, 300, 0] },
        ] },
    },
    { // 5 scouts
        check: { units: [3, 12, 23], number: 5 },
        bonus: { races: [
            { res: [350, 400, 25, 0] },
            { res: [450, 200, 75, 0] },
            { res: [450, 250, 50, 0] },
        ] },
    },
    { // to scout
        check: {},
        bonus: { xp: 100 },
    },
    { // sell 10 values
        check: { values: 10 },
        bonus: { xp: 100 },
    },
    { // workshop <- academy 5
        check: { buildings: { [ID.WORKSHOP]: { level: 1 } } },
        bonus: { res: [200, 2000, 200, 0] },
    },
    { // oases
        check: { oases: 1 },
        bonus: { res: [400, 350, 250, 150] },
    },
    { // 5 troops
        check: { troops: 5 },
        bonus: { races: [
            { res: [550, 350, 650, 0] },
            { res: [475, 325, 175, 0] },
            { res: [450, 550, 250, 0] },
        ] },
    },
    { // 25 troops
        check: { troops: 25 },
        bonus: { races: [
            { res: [1500, 900, 1600, 0] },
            { res: [1200, 1000, 500, 0] },
            { res: [1050, 1300, 600, 0] },
        ] },
    },
    { // 100 troops
        check: { troops: 100 },
        bonus: { races: [
            { res: [5000, 3000, 6000, 0] },
            { res: [4500, 3500, 2000, 0] }, // ?
            { res: [4000, 6000, 2000, 0] }, // ?
        ] },
    },
    { // 250 troops
        check: { troops: 250 },
        bonus: { races: [
            { res: [10000,  6000, 14000, 0] },
            { res: [ 9000,  7000,  3500, 0] },
            { res: [ 8000, 12000,  4000, 0] },
        ] },
    },
    { // 500 troops
        check: { troops: 500 },
        bonus: { res: [15000, 9000, 20000, 0] },
    },
    { // 1000 troops
        check: { troops: 1000 },
        bonus: { races: [
            { res: [30000, 18500, 37500, 0] },
            { res: [25000, 18500,  9000, 0] },
            { res: [22500, 26000, 11250, 0] },
        ] },
    },
    { // 3000 troops
        check: { troops: 3000 },
        bonus: { races: [
            { res: [33333, 16666, 33333, 0] },
            { res: [26666, 20000, 10000, 0] },
            { res: [23333, 30000, 13333, 0] },
        ] },
    },
    { // 10000 troops
        check: { troops: 10000 },
        bonus: { races: [
            { res: [33333, 16666, 33333, 0] },
            { res: [26666, 20000, 10000, 0] },
            { res: [23333, 30000, 13333, 0] },
        ] },
    },
    { // 30000 troops
        check: { troops: 30000 },
        bonus: { races: [
            { res: [88888, 55555, 88888, 0] },
            { res: [66666, 80000, 33333, 0] },
            { res: [77777, 60000, 40000, 0] },
        ] },
    },
    { // 100000 troops
        check: { troops: 100000 },
        bonus: { races: [
            { res: [100000, 70000,100000, 0] },
            { res: [ 90000, 75000, 55555, 0] },
            { res: [ 88888, 90000, 50000, 0] },
        ] },
    },
    { // send troops support
        check: {},
        bonus: { xp: 65 },
    },
    { // rouges
        check: {},
        bonus: { res: [500, 500, 500, 500] },
    },
    { // oases
        check: { buildings: { [ID.EMBASSY]: { level: 1 } } },
        bonus: { res: [400, 350, 250, 150] },
    },

    // Chief
    { // recycle
        check: {},
        bonus: { res: [50, 50, 100, 50] },
    },
    { // 1 adventure
        check: { adventures: 1 },
        bonus: { exp: 25 },
    },
    { // horse
        check: { items: [115, 116, 117] },
        bonus: { res: [120, 150, 80, 140] },
    },
    { // marketplace
        check: { buildings: { [ID.MARKETPLACE]: { level: 1 } } },
        bonus: { res: [50, 50, 100, 50] },
    },
    { // hero prod
        check: {  },
        bonus: { res: 700 },
    },
    { // NPC-trader
        check: { trade: 'npc' },
        bonus: { res: [125, 150, 70, 100] },
    },
    { // sell an item
        check: { trade: 'sell' },
        bonus: { silver: 500 },
    },
    { // bid
        check: { trade: 'bid' },
        bonus: { adventures: 2 },
    },
    { // trade resources
        check: { trade: 'res' },
        bonus: { plus: { npc: 1 } },
    },
    { // 3 adventures
        check: { adventures: 3 },
        bonus: { exp: 75 },
    },
    { // 10 adventures
        check: { adventures: 10 },
        bonus: { exp: 100 },
    },
    { // hero level 5
        check: { hero: { level: 5 } },
        bonus: { adventures: 3 },
    },
    { // 20 adventures
        check: { adventures: 20 },
        bonus: { exp: 125 },
    },
    { // residence
        check: { buildings: { [ID.RESIDENCE]: { level: 1 } } },
        bonus: { res: [5000, 3500, 3500, 4000] },
    },
    { // residence 5
        check: { buildings: { [ID.RESIDENCE]: { level: 5 } } },
        bonus: { buildings: { [ID.RESIDENCE]: { level: 10 } } },
    },
    { // settlers
        check: { units: [9, 19, 29] },
        bonus: { races: [
            { res: [5000, 4000, 6000, 0] },
            { res: [6000, 5000, 4000, 0] },
            { res: [4500, 6000, 4500, 0] },
        ] },
    },
    { // found new village
        check: { villages: 2 },
        bonus: { res: [3500, 3500, 3500, 1000] },
    },
    { // heal hero
        check: { hero: { health: 1 } },
        bonus: { xp: 3 },
    },
    { // fully equipped
        check: { items: ['head', 'body', 'feet', 'left', 'right'] },
        bonus: { xp: 150 },
    },
    { // marketplace 5
        check: { buildings: { [ID.MARKETPLACE]: { level: 5 } } },
        bonus: { res: [200, 200, 333, 150] },
    },
];
