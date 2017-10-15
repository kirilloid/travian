import { extend } from '../../utils';

import data from '../t4';
import units from './units';
import buildings from './buildings';
import { ID } from '../base/buildings';

export default extend(data, {
    units: extend(units, {
        5:[ { p: [ID.BARRACKS], },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 1, [ID.BLACKSMITH]: 1} },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 5, [ID.BLACKSMITH]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 5} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 10} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:10, [ID.WORKSHOP]: 1} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:15, [ID.WORKSHOP]:10} },
            { p: [ID.RESIDENCE, ID.PALACE], r: {[ID.ACADEMY]:20, [ID.RALLY_POINT]:10} },
            { p: [ID.RESIDENCE, ID.PALACE] },
        ],
        6:[ { p: [ID.BARRACKS], },
            { p: [ID.BARRACKS], r: {[ID.ACADEMY]: 3, [ID.BLACKSMITH]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 1} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 3} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]: 5, [ID.STABLES]: 5} },
            { p: [ID.STABLES],  r: {[ID.ACADEMY]:15, [ID.STABLES]:10} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:10, [ID.WORKSHOP]: 1} },
            { p: [ID.WORKSHOP], r: {[ID.ACADEMY]:15, [ID.WORKSHOP]:10} },
            { p: [ID.RESIDENCE, ID.PALACE], r: {[ID.ACADEMY]:20, [ID.RALLY_POINT]:10} },
            { p: [ID.RESIDENCE, ID.PALACE] },
        ],
    }),
    buildings
});