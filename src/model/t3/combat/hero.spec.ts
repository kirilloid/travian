import * as tape from 'tape';

import units from '../units';
import TRIBES from '../tribes';

import { CombatResult } from '../../types';
import ArmyHero from './hero';
import Hero3 from '../hero';

tape('army hero (T3)', t => {
    const hero = new Hero3(units[TRIBES.ROMANS][0]);
    const armyHero = new ArmyHero(hero, { health: 100 });

    t.deepEqual(armyHero.getOff(), { i: 50, c: 0 }, 'attack:0');
    hero.setSkill('off', 100);
    t.deepEqual(armyHero.getOff(), { i: 5465, c: 0 }, 'attack:100');

    t.equal(armyHero.getOffBonus(), 0, 'bonus:0');
    hero.setSkill('offBonus', 100);
    t.equal(armyHero.getOffBonus(), 0.2, 'bonus:100');
    t.end();
});
