import { roundP } from '../../../utils';

import combat from '../../base/combat';
import { Unit } from '../../types';
import Hero3 from '../hero';
import { Side } from './factory';

const roundStat = roundP(1e-4);

export default class Army extends combat.Army<Side> {
    protected hero?: Hero3;
    protected health?: number;
    constructor(side: Side) {
        super(side);
        this.hero = side.hero;
        this.health = side.health;
    }
    public upgrade(unit: Unit, stat: number, level: number): number {
        return roundStat(stat + (stat + 300 * unit.u / 7) * (1.007 ** level - 1));
    }
    public getOff() {
        const troops = super.getOff();
        if (!this.hero || !this.health) { return troops; }
        const hero = this.hero.getOff();
        const bonus = this.hero.getOffBonus();
        return troops.add(hero).mul(1 + bonus);
    }
    public getDef() {
        const troops = super.getDef();
        if (!this.hero || !this.health) { return troops; }
        const hero = this.hero.getDef();
        const bonus = this.hero.getDefBonus();
        return troops.add(hero).mul(1 + bonus);
    }
    public getTotal() {
        return super.getTotal() + +!!this.hero;
    }
    public applyLosses(losses: number) {
        super.applyLosses(losses);
        if (this.hero && this.health) {
            this.health = Math.max(this.health - losses * 100, 0);
        }
    }
}
