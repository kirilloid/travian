import { extend, roundP, limit } from '../../utils';
const round5 = roundP(5);
const limitLvl = limit(0, 60);

import Hero from '../base/hero';

const roundBands = [10, 100, 500].map(roundP);
const limitRes = limit(0, 240000);
const round = value => roundBands[(value >= 1000) + (value >= 10000)](value);

function resCost(res) {
    const coeff = (limitLvl(this.neededLvl) + 1) ** 1.25;
    let value = 2 * res;
    if (this.neededLvl > 0) value += 30;
    const result = limitRes(round(value * coeff));
    console.log({
        lvl: this.neededLvl,
        value,
        result
    });
    return result;
}

export default class extends Hero {
    constructor(unit) {
        super(['off', 'def', 'offBonus', 'defBonus', 'regen']);
        this.unit = unit;
    }
    getCombat() {
        const { a, di, dc } = this.unit;
        const { off, def } = this.skills;
        const corr = (di / dc) ** 0.2;
        return {
            a : round5((2*a /3 + 27.5)      * off + 5*a /4),
            di: round5((2*di/3 + 27.5*corr) * def + 5*di/3),
            dc: round5((2*dc/3 + 27.5/corr) * def + 5*dc/3),
        }        
    }
    getMisc() {
        const { offBonus, defBonus, regen } = this.skills;
        return {
            ab: offBonus * 0.2,
            db: defBonus * 0.2,
            reg: regen * 10,
        };
    }
    getCost() {
        return this.unit.c.map(resCost, this);
    }
    getTime() {
        return 1.6 * this.unit.t * (limitLvl(this.neededLvl) + 1);
    }
}
