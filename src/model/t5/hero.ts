import Hero from '../t4/hero';

import { ItemEffect } from './items';
import { res } from '../types';

const tribeCosts: res[] = [
    [250, 225, 400, 0],
    [225, 175, 325, 0],
    [200, 350, 225, 0],
];

// offBonusdefBonus

export default class Hero5 extends Hero {
    protected tribeCosts: res[];
    constructor(
        protected tribe: number,
        protected items: ItemEffect[] = [],
    ) {
        super(tribe, items);
        this.tribeCosts = tribeCosts;
    }
    protected getStrength() {
        return super.getStrength() + 300;
    }
}
