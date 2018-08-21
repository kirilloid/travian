import { extend } from '../../utils';

import data from '../t4';
import units from './units';
import buildings from './buildings';
import { ID as bID } from '../base/buildings';
import tID from './tribes';
import Hero from './hero';
import items from './items';

export default extend(data, {
    units: extend(units, {
        [tID.HUNS]: [
            { b: [bID.BARRACKS] },
            { b: [bID.BARRACKS], r: {[bID.ACADEMY]: 1, [bID.BLACKSMITH]: 1} },
            { b: [bID.BARRACKS], r: {[bID.ACADEMY]: 5, [bID.BLACKSMITH]: 1} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 1} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 5} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 10} },
            { b: [bID.WORKSHOP], r: {[bID.ACADEMY]:10, [bID.WORKSHOP]: 1} },
            { b: [bID.WORKSHOP], r: {[bID.ACADEMY]:15, [bID.WORKSHOP]:10} },
            { b: [bID.RESIDENCE, bID.PALACE], r: {[bID.ACADEMY]:20, [bID.RALLY_POINT]:10} },
            { b: [bID.RESIDENCE, bID.PALACE] },
        ],
        [tID.EGYPTIANS]: [
            { b: [bID.BARRACKS] },
            { b: [bID.BARRACKS], r: {[bID.ACADEMY]: 3, [bID.BLACKSMITH]: 1} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 1} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 3} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]: 5, [bID.STABLES]: 5} },
            { b: [bID.STABLES],  r: {[bID.ACADEMY]:15, [bID.STABLES]:10} },
            { b: [bID.WORKSHOP], r: {[bID.ACADEMY]:10, [bID.WORKSHOP]: 1} },
            { b: [bID.WORKSHOP], r: {[bID.ACADEMY]:15, [bID.WORKSHOP]:10} },
            { b: [bID.RESIDENCE, bID.PALACE], r: {[bID.ACADEMY]:20, [bID.RALLY_POINT]:10} },
            { b: [bID.RESIDENCE, bID.PALACE] },
        ],
    }),
    buildings,
    items,
    Hero,
});
