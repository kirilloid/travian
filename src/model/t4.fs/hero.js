import { extend } from '../../utils';

import ID from './tribes';
import Hero from '../t4/hero';

export default class extends Hero {
    constructor(tribe) {
        super(tribe);
        this.tribeCosts = extend(this.tribeCosts, {
            [ID.EGYPTIANS]: [115, 180, 130, 75],
            [ID.HUNS]: [180, 130, 115, 75],
        });
        if (tribe === ID.HUNS) this.spd_c = 3;
        if (tribe === ID.EGYPTIANS) this.res = 2;
    }
    getMisc() {
        const { res, ...others } = super.getMisc();
        return {
            res: res * this.res,
            ...others
        };
    }
}
