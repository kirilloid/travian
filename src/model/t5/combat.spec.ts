import * as tape from 'tape';
import { almostEqual } from '../../utils/test';

import combat from './combat';
const { raid, immensity } = combat.fn;

tape('raid', t => {
    t.equal(Math.round(raid(1e-2 ** 1.22)[0] * 1e6),1000000, '<<');
    t.equal(Math.round(raid(1e-1 ** 1.22)[0] * 1e6), 973350, '<');
    t.equal(Math.round(raid(1e+0 ** 1.22)[0] * 1e6), 516000, '=');
    t.equal(Math.round(raid(1e+1 ** 1.22)[0] * 1e6),  58650, '>');
    t.equal(Math.round(raid(1e+2 ** 1.22)[0] * 1e6),   3631, '>>');
    t.end();
});

tape('immensity', t => {
    t.equal(immensity(1e3), 1.50, '1k');
    almostEqual.call(t, immensity(1e4), 1.3918, '10k');
    t.equal(immensity(1e5), 1.2785, '.1M');
    t.equal(immensity(1e6), 1.22, '1M');
    t.end();
});
