import { extend } from '../../utils';

import units from './units';
import buildings, { ID } from './buildings';
import * as combat from './combat';

export default {
    units: extend(units, [
        [   { p: [ID.BARRACKS], },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 1, [ID.BLACKSMITH]: 1} },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 5, [ID.BLACKSMITH]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 1, [ID.STABLES]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 5} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 10} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:10, [ID.WORKSHOP]: 1} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:15, [ID.WORKSHOP]:10} },
            { p: [ID.RESIDENCE, ID.PALACE], r: {[ID.ACADEMY]:20, [ID.RALLY_POINT]:10} },
            { p: [ID.RESIDENCE, ID.PALACE] },
        ],
        [   { p: [ID.BARRACKS], },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 1, [ID.BARRACKS]: 3} },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 3, [ID.BLACKSMITH]: 1} },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 1, [ID.MAIN_BUILDING]: 5} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 3} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]:15, [ID.STABLES]: 10} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:10, [ID.WORKSHOP]: 1} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:15, [ID.WORKSHOP]:10} },
            { p: [ID.RESIDENCE, ID.PALACE], r: {[ID.ACADEMY]:20, [ID.RALLY_POINT]: 5} },
            { p: [ID.RESIDENCE, ID.PALACE] },
        ],
        [   { p: [ID.BARRACKS], },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 3, [ID.BLACKSMITH]: 3} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 3} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 5} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]:15, [ID.STABLES]:10} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:10, [ID.WORKSHOP]: 1} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:15, [ID.WORKSHOP]:10} },
            { p: [ID.RESIDENCE, ID.PALACE], r: {[ID.ACADEMY]:20, [ID.RALLY_POINT]:10} },
            { p: [ID.RESIDENCE, ID.PALACE] },
        ],
    ]),
    buildings,
    combat
};