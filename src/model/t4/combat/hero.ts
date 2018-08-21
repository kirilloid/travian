import CombatPoints from '../../base/combat/points';
import { BaseArmyHero } from '../../t3/combat/base-hero';
import Hero4 from '../hero';
import { Item } from '../items';

export type HeroContext = {
    health: number
    mounted: boolean
    items: Item[]
};

export default class ArmyHero extends BaseArmyHero<Hero4, HeroContext> {
    constructor(
        protected hero: Hero4,
        protected context: HeroContext,
    ) {
        super(hero, context);
    }
    public getItems(): Item[] {
        return this.context.items;
    }
    public getOff(): CombatPoints {
        const off = CombatPoints.zero();
        if (this.context.health === 0) { return off; }
        const { a } = this.hero.getCombatStats();
        if (this.context.mounted) {
            off.c += a;
        } else {
            off.i += a;
        }
        return off;
    }
}
