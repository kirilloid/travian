import { extend } from '../../utils';
import { units3x as units, buildings3x as buildings } from '../speeds';

import data from '../t3';
import culture from './culture';

export default extend(data, { units, buildings, culture });
