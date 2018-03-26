import { extend } from '../../utils';

import ID from '../base/tribes';
import Hero from '../t4/hero';

export default class extends Hero {
    constructor(tribe) {
        super(tribe);
        this.tribeCosts = [
            [250, 225, 400, 0],
        	[225, 175, 325, 0],
	        [200, 350, 225, 0]
        ];
        this.base = 200;
    }
}
