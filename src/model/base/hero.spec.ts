import * as tape from 'tape';

import Hero from './hero';
import { res } from '../types';
import CombatPoints from './combat/points';

class RealHero extends Hero {
    public getSpeed() { return 1; }
    public getOff() { return CombatPoints.zero(); }
    public getDef() { return CombatPoints.zero(); }
    public getCost(): res { return [0,0,0,0]; }
    public getMisc(): {} { return {}; }
    public getTime() { return 0; }
}

tape('hero (base)', t => {
    const hero = new RealHero(['a', 'b']);
    t.test('levels', t => {
        t.equal(hero.getNeededLvl(), 0, '0 sp');
        hero.setSkill('a', 2);
        t.equal(hero.getNeededLvl(), 0, 'full 0 level');
        hero.setSkill('a', 50);
        t.equal(hero.getNeededLvl(), 24, '1/4');
        hero.setSkill('a', 51);
        t.equal(hero.getNeededLvl(), 25, '1/4 + 1 sp');
        hero.setSkill('a', 52);
        t.equal(hero.getNeededLvl(), 25, '1/4 + max sp');
        hero.setSkill('a', 50);
        hero.setSkill('b', 100);
        t.equal(hero.getNeededLvl(), 74, '3/4');
        t.end();
    });
    t.test('edge cases', t => {
        t.throws(() => hero.setSkill('a', -1), 'negative value');
        t.throws(() => hero.setSkill('a', 200), 'too big value');
        t.throws(() => hero.setSkill('a', NaN), 'NaN');
        t.throws(() => hero.setSkill('c', 0), 'wrong key');
        t.end();
    });
    t.end();
});
