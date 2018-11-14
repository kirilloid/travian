import * as tape from 'tape';

import { immensity, cataMorale } from './fns';
import { almostEqual } from '../../../utils/test';

tape('combat-fns (T3)', t => {
    t.test('immensity', t => {
        t.equal(immensity(1e2), 1.5, 'sub-lo');
        t.equal(immensity(1e3), 1.5, 'lo');
        almostEqual.call(t, immensity(1e4), 1.4220, 'mid-lo');
        almostEqual.call(t, immensity(1e5), 1.3414, 'mid-hi');
        t.equal(immensity(1e6), 1.2578, 'hi');
        t.equal(immensity(1e7), 1.2578, 'sup-hi');
        t.end();
    });
    t.test('cataMorale', t => {
        t.equal(cataMorale(100, 200), 1, 'sub-lo');
        t.equal(cataMorale(100, 100), 1, 'lo');
        t.equal(cataMorale(3896, 100), 0.3333, 'hi');
        t.equal(cataMorale(10000, 100), 0.3333, 'sup-hi');
        t.end();
    });
    t.end();
});
