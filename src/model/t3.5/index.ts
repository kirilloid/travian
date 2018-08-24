import { extend } from '../../utils';

import { Model } from '../types';

import data from '../t3.1';
import buildings from './buildings';

export default extend(data, { buildings }) as Model;

/*
TODO: artifacts

TODO: New combinations for resource tiles
3-4-4-7
3-5-4-6
4-3-4-7
4-3-5-6
4-4-3-7
5-4-3-6
*/
