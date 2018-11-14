import { roundP } from '../../../utils';
import { Unit } from '../../base';
import CombatPoints from '../../base/combat/points';
import bCombat from '../../base/combat';
import Hero4 from '../hero';
import { Side } from './factory';

const roundStat = roundP(1e-4);

export default class Army extends bCombat.Army<Side> {
    protected hero?: Hero4;
    /** max health is 100 */
    protected health?: number;
    constructor(side: Side) {
        super(side);
        this.hero = side.hero;
        this.health = side.health;
    }
    public getOff() {
        const unitsOff = super.getOff();
        if (!this.hero || !this.health) { return unitsOff; }
        // skill strength
        const heroOff = this.hero.getOff();
        const index = this.hero.getItemsTotal('utype') % 10;
        const unitBonus = this.hero.getItemsTotal('ubonus');
        return CombatPoints.sum([
            unitsOff,
            heroOff,
            CombatPoints.both(unitBonus * this.numbers[index]),
        ]).mul(1 + this.hero.getOffBonus());
    }
    public getDef() {
        const unitsDef = super.getDef();
        if (!this.hero || !this.health) { return unitsDef; }
        const index = this.hero.getItemsTotal('utype') % 10;
        const unitBonus = this.hero.getItemsTotal('ubonus');
        return CombatPoints.sum([
            unitsDef,
            this.hero.getDef(),
            CombatPoints.both(unitBonus * this.numbers[index]),
        ]).mul(1 + this.hero.getDefBonus());
    }
    /** losses is fractional */
    public applyLosses(losses: number) {
        super.applyLosses(losses);
        if (this.hero && this.health) {
            const armBonus = this.hero.getItemsTotal('arm');
            this.health = Math.max(this.health - losses * 100 + armBonus, 0);
        }
    }
    protected upgrade(unit: Unit, stat: number, level: number) {
        const upkeep = unit.u / 1.007;
        return roundStat(stat
            + (stat + 300 * upkeep / 7) * (1.007 ** level - 1)
            + upkeep * 0.0021);
    }
}
