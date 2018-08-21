import bItems, { Item } from '../t4/items';
import { extend } from '../../utils';

const r = (b:number, d:number=b/10) => [b-2*d, b-d, b, b+d, b+2*d];
const t3 = b => [15*b, 16*b, 17*b, 18*b, 20*b];

const var1 = v => r(v, 1);
const mvar1 = name => ({ [name]: var1 });
const weapon = { str: v => v > 1000 ? t3(100) : r(v) };

const items: Item[] = extend(extend(bItems, [
    // helms of experience are removed
    ,,,
    mvar1('reg'), mvar1('reg'), mvar1('reg'),
    { cp: r(50, 10) }, { cp: r(200, 25) }, { cp: r(400, 100) },
    mvar1('cav'), mvar1('cav'), mvar1('cav'),
    mvar1('inf'), mvar1('inf'), mvar1('inf'),
    // romans
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    // gauls
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    // teutons
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    weapon, weapon, weapon,
    // left-hand
    { fret: r(30, 5) }, { fret: r(50, 5) }, { fret: r(90, 5) }, // map
    { fvil: [25,30,35] }, { fvil: [35,40,45] }, { fvil: [45,50,55] }, // pennant
    mvar1('fall'), mvar1('fall'), mvar1('fall'), // standard
    { vis: r(5, 1) }, { vis: r(10, 1) }, { vis: t3(1) }, // spy glass
    { raid: r(10, 1) }, { raid: r(15, 1) }, { raid: r(20, 1) }, // pouch
    weapon, weapon, weapon, // shield
    mvar1('nat'), mvar1('nat'), mvar1('nat'), // horn
    // armors
    { reg:r(20,2)}, { reg:r(30,2)}, { reg:r(40,2)}, // of health
    { reg:r(10,1)}, { reg:r(15,1)}, { reg:r(20,2)}, // scale, arm is inherited
    weapon, weapon, weapon, // breastplate
    { str:r(250)}, { str:r(500)},  { str:t3(50)}, // chainmail arm is inherited
    // boots
    // of experience
    { exp: r(15,1), reg: undefined },
    { exp: r(20,1), reg: undefined },
    { exp: [25,26,27,28,30], reg: undefined },
    { ts: r(25,5) }, { ts: r(50) }, { ts: t3(5) }, // mercenary
    { spd: [2,3] }, { spd: [4,5] }, { spd: [5,6] }, // spurs
]), {
    // first horse is the same
    103: { horse: r(17,1) },
    104: { horse: [20,21,22,23,25] },
    // chicken boots
    121: { eva: r(200, 25) },
    122: { eva: r(1000, 100) },
    123: { eva: r(2000, 250) },
});

export default items;
