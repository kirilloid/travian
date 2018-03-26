import { extend } from '../../utils';

import ID from '../base/tribes';
import units from '../base/units';

export default extend(units, {
    [ID.ROMANS]: {
        0: { // legionnaire
            c: [ 120, 100, 180, 40]
        }
    },
    [ID.GAULS]: {
        0: { // phalanx
            p: 30
        }
    }
});
