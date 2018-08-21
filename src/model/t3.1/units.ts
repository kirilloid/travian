import { extend } from '../../utils';

import units from '../t3/units';
import TRIBES from '../t3/tribes';
import { Unit } from '../base';

export default extend(units, {
    [TRIBES.NATURE]: [
        {u:1},
        {u:1},
        {u:1},
        {u:1},
        {u:2},
        {u:2},
        {u:3},
        {u:3},
        {u:3},
        {u:5},
    ],
}) as Unit[][];
