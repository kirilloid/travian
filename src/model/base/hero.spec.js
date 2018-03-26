import tape from 'tape';

import ID from '../base/tribes';
import Hero from './hero';

tape('hero (base)', t => {
    const hero = new Hero(['a', 'b']);
    t.test('levels', t => {
        t.equal(hero.neededLvl, 0, '0 sp');
        hero.setSkill('a', 2);
        t.equal(hero.neededLvl, 0, 'full 0 level');
        hero.setSkill('a', 50);
        t.equal(hero.neededLvl, 24, '1/4');
        hero.setSkill('a', 51);
        t.equal(hero.neededLvl, 25, '1/4 + 1 sp');
        hero.setSkill('a', 52);
        t.equal(hero.neededLvl, 25, '1/4 + max sp');
        hero.setSkill('a', 50);
        hero.setSkill('b', 100);
        t.equal(hero.neededLvl, 74, '3/4');
        t.end();
    });
    t.test('edge cases', t => {
        t.throws(() => hero.setSkill('c', 10), 'invalid skill');
        t.throws(() => hero.setSkill('a', -1), 'negative value');
        t.throws(() => hero.setSkill('a', 200), 'too big value');
        t.throws(() => hero.setSkill('a', NaN), 'NaN');
        t.throws(() => hero.setSkill('a', {}), 'invalid value');
        t.end();
    });
    t.end();
});
