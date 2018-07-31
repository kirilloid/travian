import { extend } from '../../utils';

import buildings, { ID } from '../t4.fs/buildings';

export default extend(buildings, {
    [ID.WATERWORKS]: { c: [ 910, 945, 910, 340], k: 1.31 }
});