import { ID } from './buildings';
import { ID as iID } from './items';

export default [
// military
    { // 1: next adventure
        check: { adventures: 2 },
        bonus: { exp: 30 },
    },
    { // 2: cranny
        check: { buildings: {
            [ID.CRANNY]:  { level: 1 },
        } },
        bonus: { res: [130, 150, 120, 100] },
    },
    { // 3: barracks
        check: { buildings: {
            [ID.BARRACKS]:  { level: 1 },
        } },
        bonus: { res: [110, 140, 160, 30] },
    },
    { // 4: hero strength
        check: { hero: {
            str: 2,
        } },
        bonus: { res: [190, 250, 150, 110] },
    },
    { // 5: two units
        check: { units: 2 },
        bonus: { items: iID.CAGE },
    },
    { // 6: wall
        check: { buildings: {
            [ID.CITY_WALL]:  { level: 1 },
        } },
        bonus: { res: [120, 120, 90, 50] },
    },
    { // 7: attack an oasis
        check: { },
        bonus: { units: [2] },
    },
    { // 8: 10 adventures
        check: { adventures: 10 },
        bonus: { silver: 500 },
    },
    { // 9: auction
        check: { },
        bonus: { res: [280, 120, 220, 110] },
    },
    { // 10: barracks
        check: { buildings: {
            [ID.BARRACKS]:  { level: 3 },
        } },
        bonus: { res: [440, 290, 430, 240] },
    },
    { // 11: academy
        check: { buildings: {
            [ID.ACADEMY]:  { level: 1 },
        } },
        bonus: { res: [210, 170, 245, 115] },
    },
    { // 12: research
        check: { },
        bonus: { res: [450, 435, 515, 550] },
    },
    { // 13: smithy
        check: { buildings: {
            [ID.SMITHY]: { level: 1 },
        } },
        bonus: { res: [450, 435, 515, 550] },
    },
    { // 14: research
        check: { buildings: {
            [ID.SMITHY]: { level: 1 },
        } },
        bonus: { items: iID.SMALL_BANDAGE, number: 10 },
    },
    { // 15: hero strength
        check: { adventures: 5 },
        bonus: { items: iID.OINTMENT, number: 15 },
    },
// resources
    { // 1: iron
        check: { buildings: {
            [ID.IRONMINE]:  { level: 1 },
        } },
        bonus: { plus: 1 },
    },
    { // 2: one more to 1
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 1, number: 2 },
            [ID.WOODJACK]: { level: 1, number: 2 },
            [ID.IRONMINE]: { level: 1, number: 2 },
            [ID.CROPLAND]: { level: 1, number: 2 },
        } },
        bonus: { res: [160, 190, 150, 70] },
    },
    { // 3: granary
        check: { buildings: {
            [ID.GRANARY]:  { level: 1 },
        } },
        bonus: { res: [250, 290, 100, 130] },
    },
    { // 4: all to 1
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 1, number: 4 },
            [ID.WOODJACK]: { level: 1, number: 4 },
            [ID.IRONMINE]: { level: 1, number: 4 },
            [ID.CROPLAND]: { level: 1, number: 6 },
        } },
        bonus: { res: [400, 460, 330, 270] },
    },
    { // 5: one to 2
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 2, number: 1 },
            [ID.WOODJACK]: { level: 2, number: 1 },
            [ID.IRONMINE]: { level: 2, number: 1 },
            [ID.CROPLAND]: { level: 2, number: 1 },
        } },
        bonus: { res: [240, 255, 190, 160] },
    },
    { // 6: marketplace
        check: { buildings: {
            [ID.MARKETPLACE]:  { level: 1 },
        } },
        bonus: { res: 600 },
    },
    { // 7: make a trade
        check: {},
        bonus: { res: [100, 99, 99, 99] },
    },
    { // 8: all to 2
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 2, number: 4 },
            [ID.WOODJACK]: { level: 2, number: 4 },
            [ID.IRONMINE]: { level: 2, number: 4 },
            [ID.CROPLAND]: { level: 2, number: 6 },
        } },
        bonus: { res: [400, 400, 400, 200] },
    },
    { // 9: warehouse 3
        check: { buildings: {
            [ID.WAREHOUSE]:  { level: 3 },
        } },
        bonus: { res: [620, 730, 560, 230] },
    },
    { // 10: granary 3
        check: { buildings: {
            [ID.GRANARY]:  { level: 3 },
        } },
        bonus: { res: [880, 1020, 590, 320] },
    },
    { // 11: grain mill
        check: { buildings: {
            [ID.GRAINMILL]:  { level: 1 },
        } },
        bonus: { res: [900, 790, 685, 2230] },
    },
    { // 12: all to 5
        check: { buildings: {
            [ID.CLAYPIT]:  { level: 5, number: 4 },
            [ID.WOODJACK]: { level: 5, number: 4 },
            [ID.IRONMINE]: { level: 5, number: 4 },
            [ID.CROPLAND]: { level: 5, number: 6 },
        } },
        bonus: { plus: 1 },
    },

// game world
    { // 1: stats overview
        check: { },
        bonus: { res: [90, 120, 60, 30] },
    },
    { // 2: rename a village
        check: { },
        bonus: { cp: 100 },
    },
    { // 3: main building 3
        check: { buildings: {
            [ID.MAIN_BUILDING]:  { level: 3 },
        } },
        bonus: { res: [170, 100, 130, 70] },
    },
    { // 4: embassy 1
        check: { buildings: {
            [ID.EMBASSY]:  { level: 1 },
        } },
        bonus: { res: [215, 145, 195, 50] },
    },
    { // 5: open map
        check: { },
        bonus: { res: [90, 160, 90, 95] },
    },
    { // 6: read a message
        check: { },
        bonus: { res: [280, 315, 200, 145] },
    },
    { // 7: gold
        check: { }, // view gold benefits
        bonus: { gold: 20 },
    },
    { // 8: join an alliance
        check: { },
        bonus: { res: [295, 210, 235, 185] },
    },
    { // 9: main building 5
        check: { buildings: {
            [ID.MAIN_BUILDING]:  { level: 5 },
        } },
        bonus: { res: [570, 470, 560, 265] },
    },
    { // 10: residence
        check: { buildings: {
            [ID.RESIDENCE]:  { level: 1 },
        } },
        bonus: { res: [525, 420, 620, 335] },
    },
    { // 11: culture
        check: { },
        bonus: { res: [650, 800, 740, 530] },
    },
    { // 12: warehouse 7
        check: { buildings: {
            [ID.WAREHOUSE]:  { level: 7 },
        } },
        bonus: { res: [2650, 2150, 1810, 1320] },
    },
    { // 13: neighbourhood report
        check: { },
        bonus: { res: [800, 700, 750, 600] },
    },
    { // 14: neighbourhood report
        check: { buildings: {
            [ID.RESIDENCE]:  { level: 10 },
        } },
        bonus: { cp: 500 },
    },
    { // 15: 3 settlers
        check: { units: [,,,,,,,,,3] },
        bonus: { res: [1050, 800, 900, 750] },
    },
    { // 16: new village
        check: { villages: 2 },
        bonus: { plus: 48 },
    },
];
