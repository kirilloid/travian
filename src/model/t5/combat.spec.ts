import tape from 'tape';

import { raid } from './combat';

tape('raid', t => {
    t.equal(Math.round(raid(1e-2 ** 1.22)[0] * 1e6),1000000, '<<');
    t.equal(Math.round(raid(1e-1 ** 1.22)[0] * 1e6), 973350, '<');
    t.equal(Math.round(raid(1e+0 ** 1.22)[0] * 1e6), 516000, '=');
    t.equal(Math.round(raid(1e+1 ** 1.22)[0] * 1e6),  58650, '>');
    t.equal(Math.round(raid(1e+2 ** 1.22)[0] * 1e6),   3631, '>>');
    t.end();
});