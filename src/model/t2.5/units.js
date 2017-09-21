import { extend } from '../../utils';

import units from '../base/units';

export default extend(units, {
    0: { // roman
        0: { // legionnaire
            c: [ 120, 100, 180, 40]
        }
    },
    2: { // gaulish
        0: { // phalanx
            2: { p: 30 }            
        }
    }
});
