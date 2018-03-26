import { roundP, limit } from '../../utils';

import Hero from '../base/hero';
import ID from '../base/tribes';

const limitLvl = limit(1, 24);
const roundBands = [10, 50, 100].map(roundP);

function resCost(res) {
    const lvl = this.neededLvl;
    return roundBands[(lvl >= 5) + (lvl >= 10)](res * (1 + lvl / 24) * (lvl + 1));
}

export default class extends Hero {
    constructor(tribe) {
        super(['strength', 'offBonus', 'defBonus', 'resources']);
        this.tribe = tribe;
        this.tribeCosts = [
            [130, 115, 180, 75],
            [180, 130, 115, 75],
            [115, 180, 130, 75]
        ];
        this.spd_i = 7;
        this.spd_c = 0;
        if (tribe === ID.GAULS) this.spd_c = 5;
        this.base = 100;
        this.mul = 80;
        if (tribe === ID.ROMANS) this.mul = 100;
        this.res = 1;
    }
    levelExp(level) {
        return super.levelExp(level) / 2;
    }
    getStrength() {
        return this.skills.strength * this.mul + this.base;
    }
    getCombat() {
        const str = this.getStrength();
        return { a: str, di: str, dc: str };
    }
    getMisc() {
        const { offBonus, defBonus, resources } = this.skills;
        return {
            offBonus: offBonus * 0.25,
            defBonus: defBonus * 0.25,
            res: resources * 6,
        };
    }
    getCost() {
        return this.tribeCosts[this.tribe].map(resCost, this);
    }
    getTime() {
        // / Math.floor(server_speed/3 + 1)
        return limitLvl(this.neededLvl) * 3600;
    }
}