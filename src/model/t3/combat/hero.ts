import CombatPoints from '../../base/combat/points';

import { BaseArmyHero } from './base-hero';
import Hero3 from '../hero';

export type HeroContext = { health: number };

export default class ArmyHero extends BaseArmyHero<Hero3, HeroContext> {
    constructor(
        protected hero: Hero3,
        protected context: HeroContext,
    ) {
        super(hero, context);
    }
    public getOff(): CombatPoints {
        const off = CombatPoints.zero();
        if (this.context.health === 0) { return off; }
        const { a } = this.hero.getCombatStats();
        if (this.hero.isCavalry()) {
            off.c += a;
        } else {
            off.i += a;
        }
        return off;
    }
}
