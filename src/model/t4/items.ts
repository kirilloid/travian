/*
    1  => 'scroll',
    2  => 'inf',
    3  => 'cav',
    5  => 'fret',
    6  => 'fvil',
    7  => 'fall',
    8  => 'ts',
    10 => 'horn',
    11 => 'unit-type',
    12 => 'unit-bonus',
    13 => 'hero', // breast-plate, weapons
    14 => 'reg', // helm, bucket, ointment
    15 => 'cp',
    17 => 'horse',
    18 => 'spd',
    20 => 'book',
    21 => 'bandage', // both
    23 => 'chicken',
*/

export type Item = {
    arm?:  number,  // self-armor
    cp?:   number,  // culture points
    cav?:  number,  // cavalry train bonus
    exp?:  number,  // experience bonus
    fret?: number,  // faster return
    fvil?: number,  // faster travel between vaillages
    fall?: number,  // faster travel within alliance
    horse?:number,  // hero speed on horse
    inf?:  number,  // infantry train bonus
    nat?:  number,  // bonus against natars
    raid?: number,  // plunder bonus
    reg?:  number,  // regeneration
    spd?:  number,  // hero speed bonus (abs)
    str?:  number,  // hero self strength
    ts?:   number,  // Tournament Square effect
    utype?: number,
    ubonus?: number,
    rev?:  number,             // bandages
    cage?: number,
};

export type ItemEffect = { [P in keyof Item]: number };

const items: Item[] = [
    { exp: 15 }, { exp: 20 }, { exp: 25 },
    { reg: 10 }, { reg: 15 }, { reg: 20 },
    { cp: 100 }, { cp: 400 }, { cp: 800 },
    { cav: 10 }, { cav: 15 }, { cav: 20 },
    { inf: 10 }, { inf: 15 }, { inf: 20 },
    // weapons
    // romans
    {str: 500, utype:  0, ubonus: 3}, {str: 1000, utype:  0, ubonus: 4}, {str: 1500, utype: 0, ubonus: 5},
    {str: 500, utype:  1, ubonus: 3}, {str: 1000, utype:  1, ubonus: 4}, {str: 1500, utype: 1, ubonus: 5},
    {str: 500, utype:  2, ubonus: 3}, {str: 1000, utype:  2, ubonus: 4}, {str: 1500, utype: 2, ubonus: 5},
    {str: 500, utype:  4, ubonus: 9}, {str: 1000, utype:  4, ubonus:12}, {str: 1500, utype: 4, ubonus: 15},
    {str: 500, utype:  5, ubonus:12}, {str: 1000, utype:  5, ubonus:16}, {str: 1500, utype: 5, ubonus: 20},
    // gauls
    {str: 500, utype: 20, ubonus: 3}, {str: 1000, utype: 20, ubonus: 4}, {str: 1500, utype: 20, ubonus: 5},
    {str: 500, utype: 21, ubonus: 3}, {str: 1000, utype: 21, ubonus: 4}, {str: 1500, utype: 21, ubonus: 5},
    {str: 500, utype: 23, ubonus: 6}, {str: 1000, utype: 23, ubonus: 8}, {str: 1500, utype: 23, ubonus: 0},
    {str: 500, utype: 24, ubonus: 6}, {str: 1000, utype: 24, ubonus: 8}, {str: 1500, utype: 24, ubonus: 10},
    {str: 500, utype: 25, ubonus: 9}, {str: 1000, utype: 25, ubonus:12}, {str: 1500, utype: 25, ubonus: 15},
    // teutons
    {str: 500, utype: 10, ubonus: 3}, {str: 1000, utype: 10, ubonus: 4}, {str: 1500, utype: 10, ubonus: 5},
    {str: 500, utype: 11, ubonus: 3}, {str: 1000, utype: 11, ubonus: 4}, {str: 1500, utype: 11, ubonus: 5},
    {str: 500, utype: 12, ubonus: 3}, {str: 1000, utype: 12, ubonus: 4}, {str: 1500, utype: 12, ubonus: 5},
    {str: 500, utype: 14, ubonus: 6}, {str: 1000, utype: 14, ubonus: 8}, {str: 1500, utype: 14, ubonus: 10},
    {str: 500, utype: 15, ubonus: 9}, {str: 1000, utype: 15, ubonus:12}, {str: 1500, utype: 15, ubonus: 15},
    // left-hand
    { fret: 30 },        { fret: 40 },        { fret: 50 },
    { fvil: 30 },        { fvil: 40 },        { fvil: 50 },
    { fall: 15 },        { fall: 20 },        { fall: 25 },
    // empty objects for spyglasses
    {}, {}, {},
    // 73
    { raid: 10 },        { raid: 15 },        { raid: 20 },
    { str: 500 },        { str: 1000 },       { str: 1500 },
    { nat: 20 },         { nat: 25 },         { nat: 30 },
    // armors
    { reg: 20 },         { reg: 30 },         { reg: 40 },
    { arm: 4, reg: 10 }, { arm: 6, reg: 15 }, { arm: 8, reg: 20 },
    { str: 500 },        { str: 1000 },       { str: 1500 },
    { str: 250, arm:3 }, { str: 500, arm:4 }, { str: 750, arm:5 },
    // boots
    { reg: 10 },         { reg: 15 },         { reg: 20 },
    { ts: 25 },          { ts: 50 },          { ts: 75 },
    { spd: 3 },          { spd: 4 },          { spd: 5 },
    { horse: 14 },       { horse: 17 },       { horse: 20 },
    { reg: 1 }, // ointment
    { exp: 10 }, // scroll
    { reg: 100 }, // bucket
    { }, // tablets
    { }, // book
    { cp: 500 }, // artwork
    { rev: 25 }, // small bandage
    { rev: 33 }, // big bandage
    { cage: 1 },
];

export default items;

export const ID = {
    HORSE: 102,
    OINTMENT: 106,
    SMALL_BANDAGE: 112,
    BIG_BANDAGE: 113,
    CAGE: 114,
};
