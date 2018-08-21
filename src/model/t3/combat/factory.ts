import { extend } from '../../../utils';

import { Off as bOff, Def as bDef } from '../../base/combat';
import { Building } from '../../base/buildings';
import { Unit } from '../../types';
import bFactory from '../../base/combat/factory';
import ArmyHero from './hero';
import Hero3 from '../hero';

export type Off = bOff & { hero?: ArmyHero };
export type Def = bDef & { hero?: ArmyHero };
export type Side = Off | Def;

export default function factory(
    { units, buildings }: { units: Unit[][], buildings: Building[] },
) {
    const { off: bOff, def: bDef, place } = bFactory({ units, buildings });
    function heroF(
        { tribe, unit: unitIndex, health = 100, bonus = 0, self = 0 }
        : { tribe: number, unit: number, health?: number, bonus?: number, self?: number },
    ): ArmyHero {
        const unit = units[tribe][unitIndex];
        const hero = new Hero3(unit);
        hero.setSkill('off', self);
        hero.setSkill('def', self);
        hero.setSkill('offBonus', bonus);
        hero.setSkill('defBonus', bonus);
        return new ArmyHero(hero, { health });
    }
    function off(obj: Partial<bOff> & { tribe?: number,
            hero?: { health?: number, unit: number, bonus?: number, self?: number } }): Off {
        const { hero, ...bObj } = obj;
        const result = bOff(bObj);
        const { tribe } = result;
        if (typeof hero !== 'undefined') {
            const armyHero = heroF({ tribe, ...hero });
            // result.hero = undefined;
            return extend(result, { hero: armyHero });
        } else {
            return result;
        }
    }
    function def(obj: Partial<bDef> & { tribe?: number,
            hero?: { health?: number, unit: number, bonus?: number, self?: number } }): Def {
        const { hero, ...bObj } = obj;
        const result = bDef(bObj);
        const { tribe } = result;
        if (typeof hero !== 'undefined') {
            const armyHero = heroF({ tribe, ...hero });
            return extend(result, { hero: armyHero });
        } else {
            return result;
        }
    }
    return { off, def, place };
}
