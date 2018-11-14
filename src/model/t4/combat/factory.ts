import { extend } from '../../../utils';

import { Off as bOff, Def as bDef } from '../../base/combat';
import { Building } from '../../base/buildings';
import { Unit } from '../../types';
import { ItemEffect } from '../items';
import { baseFactory, HeroFactory } from '../../t3/combat/factory';
import Hero4 from '../hero';

export type Off<H> = bOff & { hero?: H, health?: number };
export type Def<H> = bDef & { hero?: H, health?: number };
export type Side = Off<Hero4> | Def<Hero4>;

type HeroParams = {
    health?: number,
    bonus?: number,
    self?: number,
    mounted?: boolean,
    items?: ItemEffect[],
};

export default function factory(
    { units, buildings }: { units: Unit[][], buildings: Building[] },
) {
    const factories = baseFactory<Hero4, HeroParams>({ units, buildings });
    const hero: HeroFactory<Hero4, HeroParams> = (
        tribe,
        { bonus = 0, self = 0, mounted = false, items = [] },
    ) => {
        const hero = new Hero4(tribe, items);
        hero.setSkill('strength', self);
        hero.setSkill('offBonus', bonus);
        hero.setSkill('defBonus', bonus);
        hero.setMount(+mounted);
        return hero;
    };

    return { ...factories, hero };
}
