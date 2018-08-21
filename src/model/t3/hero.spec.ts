import * as tape from 'tape';

import { UnitRegular } from '../types';
import ID from '../base/tribes';
import units from './units';
import Hero from './hero';

tape('hero (T3)', t => {
    t.test('leggionnaire', t => {
        const unit = units[ID.ROMANS][0];
        const hero = new Hero(unit as UnitRegular);
        t.test('level 0', t => {
            t.deepEqual(hero.getCombatStats(), { a: 50, di: 60, dc: 85 }, 'combat');
            t.deepEqual(hero.getCost(), [240, 200, 300, 60], 'cost');
            t.equal(hero.getTime(), 3200, 'time');
            t.equal(hero.getNeededLvl(), 0, 'lvl');
            t.equal(hero.getNeededExp(), 0, 'exp');
            t.end();
        });
        t.test('level 40', t => {
            hero.setSkill('off', 100);
            hero.setSkill('def', 100);
            t.deepEqual(hero.getCombatStats(), { a: 5465, di: 4950, dc: 6370 }, 'combat');
            t.deepEqual(hero.getCost(), [27000, 23000, 33000, 9100], 'cost');
            t.equal(hero.getTime(), 128000, 'time');
            t.equal(hero.getNeededLvl(), 39, 'lvl');
            t.equal(hero.getNeededExp(), 78000, 'exp');
            t.end();
        });
        t.test('level 100', t => {
            hero.setSkill('offBonus', 100);
            hero.setSkill('defBonus', 100);
            hero.setSkill('regen', 100);
            t.deepEqual(hero.getCost(), [46000, 39000, 56500, 15500], 'cost');
            t.equal(hero.getTime(), 195200, 'time');
            t.equal(hero.getNeededLvl(), 99, 'lvl');
            t.equal(hero.getNeededExp(), 495000, 'exp');
            t.end();
        });
        t.end();
    });
    t.test('Paladin', t => {
        const unit = units[ID.TEUTONS][4];
        const hero = new Hero(unit as UnitRegular);
        t.test('level 0', t => {
            t.deepEqual(hero.getCombatStats(), { a: 70, di: 165, dc: 65 }, 'combat');
            t.deepEqual(hero.getCost(), [740, 540, 580, 150], 'cost');
            t.equal(hero.getTime(), 4800, 'time');
            t.end();
        });

        t.test('level 40', t => {
            hero.setSkill('off', 100);
            hero.setSkill('def', 100);
            t.deepEqual(hero.getCombatStats(), { a: 6485, di: 10135, dc: 5025 }, 'combat');
            t.deepEqual(hero.getCost(), [77500, 57500, 61500, 18000], 'cost');
            t.equal(hero.getTime(), 192000, 'time');
            t.end();
        });

        t.test('level 100', t => {
            hero.setSkill('offBonus', 100);
            hero.setSkill('defBonus', 100);
            hero.setSkill('regen', 100);
            t.deepEqual(hero.getCost(), [131500, 97000, 104000, 30500], 'cost');
            t.equal(hero.getTime(), 292800, 'time');
            t.end();
        });
        t.end();
    });
    t.end();
});
