import * as tape from 'tape';

import ID from '../base/tribes';
import Hero from './hero';

class RealHero extends Hero {
    public getStrength(): number {
        return super.getStrength();
    }
}

tape('hero (T4)', t => {
    t.test('romans', t => {
        const hero = new RealHero(ID.ROMANS);
        t.test('level 0', t => {
            t.deepEqual(hero.getStrength(), 100, 'strength');
            t.deepEqual(hero.getCost(), [130, 120, 180, 80], 'cost');
            t.equal(hero.getTime(), 3600, 'time');
            t.equal(hero.getNeededLvl(), 0, 'lvl');
            t.equal(hero.getNeededExp(), 0, 'exp');
            t.end();
        });
        t.test('level 25', t => {
            hero.setSkill('strength', 100);
            t.deepEqual(hero.getStrength(), 10100, 'strength');
            t.deepEqual(hero.getCost(), [6500, 5800, 9000, 3800], 'cost');
            t.equal(hero.getTime(), 86400, 'time');
            t.equal(hero.getNeededLvl(), 24, 'lvl');
            t.equal(hero.getNeededExp(), 15000, 'exp');
            t.end();
        });

        t.test('level 100', t => {
            hero.setSkill('offBonus', 100);
            hero.setSkill('defBonus', 100);
            hero.setSkill('resources', 100);
            t.deepEqual(hero.getCost(), [66600, 58900, 92300, 38400], 'cost');
            t.equal(hero.getTime(), 86400, 'time');
            t.equal(hero.getNeededLvl(), 99, 'lvl');
            t.equal(hero.getNeededExp(), 247500, 'exp');
            t.end();
        });
        t.end();
    });
    t.test('teutons', t => {
        const hero = new RealHero(ID.TEUTONS);
        t.test('level 0', t => {
            t.equal(hero.getStrength(), 100, 'strength');
            t.deepEqual(hero.getCost(), [180, 130, 120, 80], 'cost');
            t.equal(hero.getTime(), 3600, 'time');
            t.end();
        });

        t.test('level 25', t => {
            hero.setSkill('strength', 100);
            t.equal(hero.getStrength(), 8100, 'strength');
            t.deepEqual(hero.getCost(), [9000, 6500, 5800, 3800], 'cost');
            t.equal(hero.getTime(), 86400, 'time');
            t.end();
        });

        t.test('level 100', t => {
            hero.setSkill('offBonus', 100);
            hero.setSkill('defBonus', 100);
            hero.setSkill('resources', 100);
            t.deepEqual(hero.getCost(), [92300, 66600, 58900, 38400], 'cost');
            t.equal(hero.getTime(), 86400, 'time');
            t.end();
        });
        t.end();
    });
    t.end();
});
