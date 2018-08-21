import * as tape from 'tape';

import Army from './army';

import factory from './factory';
import units from '../units';
import buildings from '../buildings';
import tribes from '../../t3/tribes';

const { off } = factory({ units, buildings });

tape('combat (hero influence)', (t) => {
    let army: Army;
    army = new Army(off({ tribe: tribes.TEUTONS, hero: { self: 20 } }));
    t.deepEqual(army.getOff(), { i: 1700, c: 0 });

    army = new Army(off({ hero: { items: [{ str: 1000 }] } }));
    t.deepEqual(army.getOff(), { i: 1100, c: 0 });

    army = new Army(off({ hero: { self: 10, mounted: true,
        items: [{ str: 1000 }] } }));
    t.deepEqual(army.getOff(), { i: 0, c: 2100 });

    army = new Army(off({ hero: { self: 10,
        items: [{ str: 500 }, { str: 1500 }, { nat: 20 }] } }));
    t.deepEqual(army.getOff(), { i: 3100 * 1.2, c: 0 });

    t.end();
});
