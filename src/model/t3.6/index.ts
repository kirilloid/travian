import { extend } from '../../utils';

import { Model } from '../types';

import data from '../t3';
import buildings from './buildings';

export default extend(data, { buildings }) as Model;