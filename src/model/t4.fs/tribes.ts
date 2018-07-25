import { extend } from '../../utils';

import baseID from '../base/tribes';

export default extend<{[P: string]: number}>(baseID, {
    EGYPTIANS: 5,
    HUNS: 6
});
