import { extend } from '../../../utils';

import { Off as bOff, Def as bDef } from '../../base/combat';
import { Building } from '../../base/buildings';
import { Unit } from '../../types';
import bFactory from '../../base/combat/factory';
import Hero3 from '../hero';

export type Off<H> = bOff & { hero?: H, health?: number };
export type Def<H> = bDef & { hero?: H, health?: number };
export type Side = Off<Hero3> | Def<Hero3>;

type HeroParams = {
    unit: number,
    health?: number,
    bonus?: number,
    self?: number,
};

export type HeroFactory<H,P> = (tribe: number, params: P) => H;

export function baseFactory<H,P extends { health?: number }>(
    { units, buildings }: { units: Unit[][], buildings: Building[] },
) {
    const { off: bOff, def: bDef, place } = bFactory({ units, buildings });

    function off(
        this: { hero: HeroFactory<H,P> },
        obj: Partial<bOff> & { tribe?: number, hero?: P },
    ): Off<H> {
        const { hero, ...bObj } = obj;
        const result = bOff(bObj);
        const { tribe } = result;
        if (typeof hero !== 'undefined') {
            const { health = 100 } = hero;
            return extend(result, { hero: this.hero(tribe, hero), health });
        } else {
            return result;
        }
    }
    function def(
        this: { hero: HeroFactory<H,P> },
        obj: Partial<bDef> & { tribe?: number, hero?: P },
    ): Def<H> {
        const { hero, ...bObj } = obj;
        const result = bDef(bObj);
        const { tribe } = result;
        if (typeof hero !== 'undefined') {
            const { health = 100 } = hero;
            return extend(result, { hero: this.hero(tribe, hero), health });
        } else {
            return result;
        }
    }
    return { off, def, place };
}

export default function factory(model: any) {
    const hero: HeroFactory<Hero3, HeroParams> = (tribe, { unit: unitIndex, bonus = 0, self = 0 }) => {
        const unit = model.units[tribe][unitIndex];
        const hero = new Hero3(unit);
        hero.setSkill('off', self);
        hero.setSkill('def', self);
        hero.setSkill('offBonus', bonus);
        hero.setSkill('defBonus', bonus);
        return hero;
    };
    return extend(baseFactory<Hero3, HeroParams>(model), { hero });
}
