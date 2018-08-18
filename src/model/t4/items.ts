export type Item = {
    arm?:  number | number[] // self-armor
    cp?:   number | number[] // culture points
    cav?:  number | number[] // cavalry train bonus
    exp?:  number | number[] // experience bonus
    fret?: number | number[] // faster return
    fvil?: number | number[] // faster travel between vaillages
    fall?: number | number[] // faster travel within alliance
    horse?:number | number[] // hero speed on horse
    inf?:  number | number[] // infantry train bonus
    nat?:  number | number[] // bonus against natars
    raid?: number | number[] // plunder bonus
    reg?:  number | number[] // regeneration
    spd?:  number | number[] // hero speed bonus (abs)
    str?:  number | number[] // hero self strength
    ts?:   number | number[] // Tournament Square effect
    unit?: { [P: number]: number } // unit bonus
    // T5
    eva?:  number | number[] // evade troops
    vis?:  number | number[] // visibility (discovery) at rally point
} | string | undefined;

const items: Item[] = [
    { exp: 15 },			{ exp: 20 },			{ exp: 25 },
	{ reg: 10 },			{ reg: 15 },			{ reg: 20 },
	{ cp: 100 },			{ cp: 400 },			{ cp: 800 },
	{ cav: 10 },			{ cav: 15 },			{ cav: 20 },
	{ inf: 10 },			{ inf: 15 },			{ inf: 20 },
	// weapons
	// romans
	{str: 500, unit: {  0: 3 }},	{str: 1000, unit: { 0: 4 }},	{str: 1500, unit: { 0: 5 }},
	{str: 500, unit: {  1: 3 }},	{str: 1000, unit: { 1: 4 }},	{str: 1500, unit: { 1: 5 }},
	{str: 500, unit: {  2: 3 }},	{str: 1000, unit: { 2: 4 }},	{str: 1500, unit: { 2: 5 }},
	{str: 500, unit: {  4: 9 }},	{str: 1000, unit: { 4: 12 }},	{str: 1500, unit: { 4: 15 }},
	{str: 500, unit: {  5: 12}},	{str: 1000, unit: { 5: 16 }},	{str: 1500, unit: { 5: 20 }},
	// gauls
	{str: 500, unit: { 20: 3 }},	{str: 1000, unit: { 20: 4 }},	{str: 1500, unit: { 20: 5 }},
	{str: 500, unit: { 21: 3 }},	{str: 1000, unit: { 21: 4 }},	{str: 1500, unit: { 21: 5 }},
	{str: 500, unit: { 23: 6 }},	{str: 1000, unit: { 23: 8 }},	{str: 1500, unit: { 23: 0 }},
	{str: 500, unit: { 24: 6 }},	{str: 1000, unit: { 24: 8 }},	{str: 1500, unit: { 24: 10 }},
	{str: 500, unit: { 25: 9 }},	{str: 1000, unit: { 25: 12 }},	{str: 1500, unit: { 25: 15 }},
	// teutons
	{str: 500, unit: { 10: 3 }},	{str: 1000, unit: { 10: 4 }},	{str: 1500, unit: { 10: 5 }},
	{str: 500, unit: { 11: 3 }},	{str: 1000, unit: { 11: 4 }},	{str: 1500, unit: { 11: 5 }},
	{str: 500, unit: { 12: 3 }},	{str: 1000, unit: { 12: 4 }},	{str: 1500, unit: { 12: 5 }},
	{str: 500, unit: { 14: 6 }},	{str: 1000, unit: { 14: 8 }},	{str: 1500, unit: { 14: 10 }},
	{str: 500, unit: { 15: 9 }},	{str: 1000, unit: { 15: 12 }},	{str: 1500, unit: { 15: 15 }},
	// left-hand
	{ fret: 30 },		{ fret: 40 },		{ fret: 50 },
	{ fvil: 30 },		{ fvil: 40 },		{ fvil: 50 },
	{ fall: 15 },		{ fall: 20 },		{ fall: 25 },
    ,,,
    // 73
	{ raid: 10 },		{ raid: 15 },		{ raid: 20 },
	{ str: 500 },		{ str: 1000 },		{ str: 1500 },
	{ nat: 20 },		{ nat: 25 },		{ nat: 30 },
	// armors
	{ reg: 20 },		{ reg: 30 },		{ reg: 40 },
	{ arm: 4, reg: 10 },{ arm: 6, reg: 15 },{ arm: 8, reg: 20 },
	{ str: 500 },		{ str: 1000 },		{ str: 1500 },
	{ str:250, arm:3 },{ str:500, arm:4 },{ str:750, arm:5 },
	// boots
	{ reg: 10 },		{ reg: 15 },		{ reg: 20 },
	{ ts: 25 },			{ ts: 50 },			{ ts: 75 },
	{ spd: 3 },			{ spd: 4 },			{ spd: 5 },
    { horse: 14 },		{ horse: 17 },		{ horse: 20 },
    'ointment', 'scroll', 'bucket', 'tablets', 'book',
    'artwork', 'small bandage', 'big bandage', 'cage'
];

export default items;

export const ID = {
    OINTMENT: 106,
    SMALL_BANDAGE: 112,
    BIG_BANDAGE: 113,
    CAGE: 114,
};
