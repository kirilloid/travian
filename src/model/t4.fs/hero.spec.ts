import * as tape from 'tape';

import ID from './tribes';
import Hero from './hero';

tape('hero (F&S)', t => {
    const hero = new Hero(ID.EGYPTIANS);
    t.deepEqual(hero.getCost(), [120, 180, 130, 80], 'cost');
    hero.setSkill('resources', 100);
    t.equal(hero.getMisc().res, 1200, 'res');
    t.end();
});
