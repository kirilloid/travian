import { Model } from '../types';

import units from './units';
import buildings from './buildings';
import culture from './culture';
import * as combat from './combat';
import Hero from './hero';

export default {
    units,
    buildings,
    culture,
    combat,
    Hero
} as Model<typeof Hero>;