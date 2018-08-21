import { IHero } from '../../types';
import CombatPoints from '../../base/combat/points';

export type HeroContext = { health: number };

export abstract class BaseArmyHero<H extends IHero<any, any>, C extends { health: number }> {
    constructor(
        protected hero: H,
        protected context: C,
    ) {}
    public abstract getOff(): CombatPoints;
    public getDef(): CombatPoints {
        if (this.context.health === 0) { return CombatPoints.zero(); }
        const { di, dc } = this.hero.getCombatStats();
        return new CombatPoints(di, dc);
    }
    public getOffBonus() {
        if (this.context.health === 0) { return 0; }
        return this.hero.getOffBonus();
    }
    public getDefBonus() {
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
