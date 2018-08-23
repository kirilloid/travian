import { extend } from '../../utils';

import { res } from '../types';

import ID from './tribes';
import Hero, { tribeCosts } from '../t4/hero';
import { ItemEffect } from '../t4/items';

export default class extends Hero {
    protected tribeCosts: res[];
    constructor(
        protected tribe: number,
        protected items: ItemEffect[] = [],
    ) {
        super(tribe, items);
        this.tribeCosts = extend(tribeCosts, {
            [ID.EGYPTIANS]: [115, 180, 130, 75],
            [ID.HUNS]: [180, 130, 115, 75],
        });
        if (tribe === ID.HUNS) { this.speedMounted += 3; }
        if (tribe === ID.EGYPTIANS) { this.res = 2; }
    }
    public getResources() {
        return super.getResources() * this.res;
    }
}
