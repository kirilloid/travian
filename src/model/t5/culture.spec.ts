import * as tape from 'tape';

import culture from './culture';

tape('culture (T5)', t => {
    t.equal(culture(1), 0);
    t.equal(culture(2), 1e3);
    t.equal(culture(6), 40e3);
    t.equal(culture(7), 70e3);
    t.equal(culture(17), 880e3);
    t.equal(culture(35), 5530e3);
    t.end();
});
