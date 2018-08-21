import { extend, roundP, zipWith, sum } from '../../utils';

import CombatPoints from '../base/combat/points';
import bCombat, { Off as bOff, Def as bDef } from '../base/combat';
import combat, { BaseArmyHero } from '../t3/combat';
import { Unit } from '../base';
import { IHero } from '../types';
import Hero4, { H4K, H4S } from './hero';
import { Item } from './items';

const roundStat = roundP(1e-4);

type Off = bOff & { hero: ArmyHero }
type Def = bDef & { hero: ArmyHero }
type Side = Off | Def;

export type HeroContext = {
    health: number
    mounted: boolean
    items: Item[]
}

export class ArmyHero extends BaseArmyHero<Hero4, HeroContext> {
    constructor(
        protected hero: Hero4,
        protected context: HeroContext
    ) {
        super(hero, context);
    }
    getItems(): Item[] {
        return this.context.items;
    }
    getOff(): CombatPoints {
        const off = CombatPoints.zero();
        if (this.context.health === 0) return off;
        const { a } = this.hero.getCombat();
        if (this.context.mounted) {
            off.c += a;
        } else {
            off.i += a;
        }
        return off;
    }
}

class Army extends bCombat.Army<Side> {
    protected hero: ArmyHero;
    constructor(side: Side) {
        super(side);
        this.hero = side.hero;
    }
    protected getBonusType(key: keyof Item): number[] {
        const result: number[] = [];
        this.hero.getItems().forEach((item: Item) => {
            const value = item[key];
            if (typeof value === 'number') {
                result.push(value);
            }
        });
        return result;
    }
    sumUnitBonus(getCP: (unit: Unit) => CombatPoints): CombatPoints {
        return zipWith(
            (bonus: number, type: number) => {
                const index = type % 10;
                const total = this.numbers[index] * bonus;
                return getCP(this.units[index]).mul(total);
            },
            this.getBonusType('ubonus'),
            this.getBonusType('utype')
        ).reduce(CombatPoints.add, CombatPoints.zero());
    }
    getOff() {
        const off = super.getOff();
        if (!this.hero) return off;
        // skill strength
        const hOff = this.hero.getOff();
        const str = sum(this.getBonusType('str'));
        const nat = this.getBonusType('nat')
            .reduce((total: number, nat: number) => total * (1 + nat / 100), 1);
        return CombatPoints.sum([
            off,
            hOff,
            new CombatPoints(str, str).mask(hOff),
            this.sumUnitBonus(bCombat.fns.getUnitOff)
        ]).mul(this.hero.getOffBonus() * nat);
    }
    getDef() {
        const def = super.getDef();
        if (!this.hero) return def;
        const str = sum(this.getBonusType('str'));
        return CombatPoints.sum([
            def,
            this.hero.getDef(),
            new CombatPoints(str, str),
            this.sumUnitBonus(bCombat.fns.getUnitDef)
        ]).mul(this.hero.getDefBonus());
    }
    upgrade(unit: Unit, stat: number, level: number) {
        const upkeep = unit.u / 1.007;
        return roundStat(stat
            + (stat + 300 * upkeep / 7) * (1.007 ** level - 1)
            + upkeep * 0.0021);
    }
    applyLosses(losses: number) {
        super.applyLosses(losses);
        if (this.hero) {
            const armBonus = sum(this.getBonusType('arm'));
            this.hero.applyLosses(losses - armBonus / 100);
        }
    }
}

export default extend(combat, { Army });
