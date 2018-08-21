import * as tape from 'tape';

import CombatPoints from './points';

tape('combat points', t => {
    t.deepEqual(CombatPoints.sum([]), { i: 0, c: 0 }, ':sum(0)');

    t.deepEqual(CombatPoints.sum([
        new CombatPoints(1, 2),
        new CombatPoints(3, 4),
    ]), { i: 4, c: 6 }, ':sum(2)');

    t.deepEqual(
        new CombatPoints(1, 2).add(
        new CombatPoints(3, 4)),
        { i: 4, c: 6 }, '.add');

    t.deepEqual(
        new CombatPoints(1, 2).mul(2),
        { i: 2, c: 4 }, '.mul');

    t.deepEqual(
        new CombatPoints(3, 4).mask(new CombatPoints(10, 0)),
        { i: 3, c: 0 }, '.mul');

    t.end();
});
