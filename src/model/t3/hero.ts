import { roundP, limit } from '../../utils';
import CombatPoints from '../base/combat/points';
import { res, Unit } from '../types';

const round5 = roundP(5);
const limitLvl = limit(0, 60);

import Hero from '../base/hero';

const limitRes = limit(0, 240000);
const round = (value: number) => {
    if (value >= 10000) { return roundP(500)(value); }
    if (value >= 1000) { return roundP(100)(value); }
    return roundP(10)(value);
};

export default class Hero3 extends Hero {
    constructor(private unit: Unit) {
        super(['off', 'def', 'offBonus', 'defBonus', 'regen']);
    }
    public getSpeed() {
        return this.unit.v;
    }
    public getOff() {
        const { a } = this.unit;
        const atk = round5((2*a/3 + 27.5) * this.skills.off + 5*a / 4);
        return CombatPoints.off(atk, this.unit.i);
    }
    public getDef() {
        const { di, dc } = this.unit;
        const { def } = this.skills;
        const corr = (di / dc) ** 0.2;
        return new CombatPoints(
            round5((2*di/3 + 27.5*corr) * def + 5*di/3),
            round5((2*dc/3 + 27.5/corr) * def + 5*dc/3),
        );
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
        if (this.getNeededLvl() > 0) { value += 30; }
        const result = limitRes(round(value * coeff));
        return result;
    }
}
