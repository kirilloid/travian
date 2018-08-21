import { roundP, zipWith, sum } from '../../../utils';
import { Unit } from '../../base';
import CombatPoints from '../../base/combat/points';
import bCombat from '../../base/combat';
import { Item } from '../items';
import ArmyHero from './hero';
import { Side } from './factory';

const roundStat = roundP(1e-4);

export default class Army extends bCombat.Army<Side> {
    protected hero?: ArmyHero;
    constructor(side: Side) {
        super(side);
        this.hero = side.hero;
    }
    public getOff() {
        const unitsOff = super.getOff();
        if (!this.hero) { return unitsOff; }
        // skill strength
        const heroOff = this.hero.getOff();
        const str = sum(this.getBonusType('str'));
        const nat = 1 + sum(this.getBonusType('nat')) / 100;
        const bonus = this.hero.getOffBonus();
        return CombatPoints.sum([
            unitsOff,
            heroOff,
            new CombatPoints(str, str).mask(heroOff),
            this.sumUnitBonus(bCombat.fns.getUnitOff),
        ]).mul((1 + bonus) * nat);
    }
    public getDef() {
        const unitsDef = super.getDef();
        if (!this.hero) { return unitsDef; }
        const str = sum(this.getBonusType('str'));
        const bonus = this.hero.getOffBonus();
        return CombatPoints.sum([
            unitsDef,
            this.hero.getDef(),
            new CombatPoints(str, str),
            this.sumUnitBonus(bCombat.fns.getUnitDef),
        ]).mul((1 + bonus));
    }
    public applyLosses(losses: number) {
        super.applyLosses(losses);
        if (this.hero) {
            const armBonus = sum(this.getBonusType('arm'));
            this.hero.applyLosses(Math.max(losses - armBonus / 100, 0));
        }
    }
    protected upgrade(unit: Unit, stat: number, level: number) {
        const upkeep = unit.u / 1.007;
        return roundStat(stat
            + (stat + 300 * upkeep / 7) * (1.007 ** level - 1)
            + upkeep * 0.0021);
    }
    protected getBonusType(key: keyof Item): number[] {
        const result: number[] = [];
        if (this.hero) {
            this.hero.getItems().forEach((item: Item) => {
                const value = item[key];
                if (typeof value === 'number') {
                    result.push(value);
                }
            });
        }
        return result;
    }
    protected sumUnitBonus(getCP: (unit: Unit) => CombatPoints): CombatPoints {
        return zipWith(
            (bonus: number, type: number) => {
                const index = type % 10;
                const total = this.numbers[index] * bonus;
                return getCP(this.units[index]).mul(total);
            },
            this.getBonusType('ubonus'),
            this.getBonusType('utype'),
        ).reduce(CombatPoints.add, CombatPoints.zero());
    }
}
