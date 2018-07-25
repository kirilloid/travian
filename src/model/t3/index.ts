import { extend } from '../../utils';

import { Model } from '../types';

import data from '../base';
import units from './units';
import buildings from './buildings';
import Hero from './hero';
import culture from './culture';

export default extend(data, {
    units,
    buildings,
    culture,
    Hero
}) as Model<Hero>;