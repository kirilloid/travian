import { roundP, limit } from '../../utils';
import { res, UnitRegular } from '../types';

const round5 = roundP(5);
const limitLvl = limit(0, 60);

import Hero from '../base/hero';

const limitRes = limit(0, 240000);
const round = (value: number) => {
    if (value >= 10000) return roundP(500)(value);
    if (value >= 1000) return roundP(100)(value);
    return roundP(10)(value);
}

export type H3S = { ab: number, db: number, reg: number }
export type H3K = 'off' | 'def' | 'offBonus' | 'defBonus' | 'regen';

export default class Hero3 extends Hero<H3S, H3K> {
    constructor(private unit: UnitRegular) {
        super(['off', 'def', 'offBonus', 'defBonus', 'regen']);
    }
    public getCombat() {
        const { a, di, dc } = this.unit;
        const { off, def } = this.skills;
        const corr = (di / dc) ** 0.2;
        return {
            a : round5((2*a /3 + 27.5)      * off + 5*a /4),
            di: round5((2*di/3 + 27.5*corr) * def + 5*di/3),
            dc: round5((2*dc/3 + 27.5/corr) * def + 5*dc/3),
        }        
    }
    public isCavalry() {
        return this.unit.i === 1;
    }
    public getCost() {
        return this.unit.c.map(this.resCost, this) as res;
    }
    public getTime() {
        return 1.6 * this.unit.t * (limitLvl(this.getNeededLvl()) + 1);
    }
    public getMisc() {
        const { offBonus, defBonus, regen } = this.skills;
        return {
            ab: offBonus * 0.2,
            db: defBonus * 0.2,
            reg: regen * 10,
        };
    }
    private resCost(res: number): number {
        const coeff = (limitLvl(this.getNeededLvl()) + 1) ** 1.25;
        let value = 2 * res;
        if (this.getNeededLvl() > 0) value += 30;
        const result = limitRes(round(value * coeff));
        return result;
    }    
}
