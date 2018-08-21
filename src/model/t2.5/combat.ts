import { extend } from '../../utils';

import combat from '../base/combat';

const immensity = () => 1.5;

export default extend(combat, { fns: { immensity } });