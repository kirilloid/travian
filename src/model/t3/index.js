import { extend } from '../../utils';

import data from '../base';
import units from './units';
import buildings from './buildings';
import culture from './culture';

export default extend(data, {
    units,
    buildings,
    culture
});