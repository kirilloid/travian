import { extend } from '../../../utils';

import combat from '../../base/combat';
import Army from './army';
import * as fns from './fns';

export default extend(combat, { Army, fns });
