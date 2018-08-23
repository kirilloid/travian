import Hero from '../../base/hero';
import CombatPoints from '../../base/combat/points';

export type HeroContext = { health: number };

export abstract class BaseArmyHero<H extends Hero, C extends HeroContext> {
    constructor(
        protected hero: H,
        protected context: C,
    ) {}
    public getOff(): CombatPoints {
        return this.context.health
            ? this.hero.getOff()
            : CombatPoints.zero();
    }
    public getDef(): CombatPoints {
        return this.context.health
            ? this.hero.getDef()
            : CombatPoints.zero();
    }
    public getOffBonus(): number {
        if (this.context.health === 0) { return 0; }
        return this.hero.getOffBonus();
    }
    public getDefBonus(): number {
        if (this.context.health === 0) { return 0; }
        return this.hero.getDefBonus();
    }
    public applyLosses(losses: number) {
        if (losses >= 0.9) {
            this.context.health = 0;
        } else {
            this.context.health = Math.max(this.context.health - 100 * losses, 0);
        }
    }
}
