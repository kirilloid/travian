import { extend } from '../../utils';

import { res } from '../types';

import ID from './tribes';
import Hero, { tribeCosts } from '../t4/hero';

export default class extends Hero {
    protected tribeCosts: res[];
    constructor(protected tribe: number) {
        super(tribe);
        this.tribeCosts = extend(tribeCosts, {
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
