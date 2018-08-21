import { extend, limit, roundP } from '../../utils';

import combat, { Off as bOff, Def as bDef } from '../base/combat';
import CombatPoints from '../base/combat/points';
import { factory as bFactory } from '../base/combat/factory';
// import { Unit } from '../base';
import Hero3, { H3S, H3K } from './hero';
import { Building } from '../base/buildings';
import { IHero, Unit, UnitRegular } from '../types';

const roundStat = roundP(1e-4);

type Off = bOff & { hero: ArmyHero }
type Def = bDef & { hero: ArmyHero }
type Side = Off | Def;

type HeroContext = { health: number }

export abstract class BaseArmyHero<H extends IHero<any, any>, C extends { health: number }> {
    constructor(
        protected hero: H,
        protected context: C
    ) {}
    public getDef(): CombatPoints {
        if (this.context.health === 0) return CombatPoints.zero();
        const { di, dc } = this.hero.getCombat();
        return new CombatPoints(di, dc);
    }
    public getOffBonus() {
        if (this.context.health === 0) return 0;
        return this.hero.getOffBonus();
    }
    public getDefBonus() {
        if (this.context.health === 0) return 0;
        return this.hero.getDefBonus();
    }
    public applyLosses(losses: number) {
        if (losses >= 0.9) {
            this.context.health = 0;    
        } else {
            this.context.health = Math.max(this.context.health - losses, 0);
        }
    }
}

export class ArmyHero extends BaseArmyHero<Hero3, HeroContext> {
    constructor(
        protected hero: Hero3,
        protected context: HeroContext
    ) {
        super(hero, context);
    }
    public getOff(): CombatPoints {
        const off = CombatPoints.zero();
        if (this.context.health === 0) return off;
        const { a } = this.hero.getCombat();
        if (this.hero.isCavalry()) {
            off.c += a;
        } else {
            off.i += a;
        }
        return off;
    }
}

class Army extends combat.Army<Side> {
    protected hero: ArmyHero;
    constructor(side: Side) {
        super(side);
        this.hero = side.hero;
    }
    upgrade(unit: Unit, stat: number, level: number): number {
        return roundStat(stat + (stat + 300 * unit.u / 7) * (1.007 ** level - 1));
    }
    getOff() {
        const troops = super.getOff();
        if (!this.hero) return troops;
        const hero = this.hero.getOff();
        const ab = this.hero.getOffBonus();
        return troops.add(hero).mul(ab);
    }
    getDef() {
        const troops = super.getOff();
        if (!this.hero) return troops;
        const hero = this.hero.getOff();
        const db = this.hero.getDefBonus();
        return troops.add(hero).mul(db);
    }
    getTotal() {
        return super.getTotal() + +!!this.hero;
    }
    applyLosses(losses: number) {
        super.applyLosses(losses);
        if (this.hero) {
            this.hero.applyLosses(losses);
        }
    }
}

export function factory(
    { units, buildings }: { units: Unit[][], buildings: Building[] }
) {
    const { off: bOff, def: bDef, place } = bFactory({ units, buildings });
    function heroF(obj: { tribe: number, unit: number, health: number }): ArmyHero {
        const unit = units[obj.tribe][obj.unit] as UnitRegular;
        return new ArmyHero(new Hero3(unit), obj);
    };
    function off(obj: Partial<bOff> & { tribe?: number, hero: { health: number, unit: number } }): Off {
        const result = bOff(obj);
        const { tribe } = result;
        const hero = heroF({ tribe, ...obj.hero });
        return extend(result, { hero });
    }
    function def(obj: Partial<bDef> & { tribe?: number, hero: { health: number, unit: number } }): Def {
        const result = bDef(obj);
        const { tribe } = result;
        const hero = heroF({ tribe, ...obj.hero });
        return extend(result, { hero });
    }
    return { off, def, place };
}

const cataMorale = (offPop: number, defPop: number) =>
    limit(0.3333, 1)((offPop / defPop) ** -0.3);

export default extend(combat, {
    Army,
    fns: { cataMorale }
});
