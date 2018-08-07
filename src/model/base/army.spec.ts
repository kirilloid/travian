import * as tape from 'tape';

import units from './units';
import { Side } from '../types';

import Army from './army';
import { extend } from '../../utils';

const ZEROES = [0,0,0,0,0, 0,0,0,0,0];
const romans = (obj: Partial<Side>) => new Army(extend<Side>({
    kind: 'def',
    units: units[0],
    numbers: ZEROES,
    upgrades: ZEROES,
}, obj));

tape('army (base)', t => {
    t.test('upgrade', t => {
        t.equal(Army.prototype.upgrade(units[0][0], 40, 0), 40);
        t.equal(Army.prototype.upgrade(units[0][0], 40, 20), 52.4048);
        t.end();
    });
    t.test('stats (100 legs + 30 EI)', t => {
        const army = romans({ numbers: [100,0,0, 0,30] });
        t.equal(army.total, 130, 'total');
        t.deepEqual(army.off, { i: 4000, c: 3600 }, 'off');
        t.deepEqual(army.def, { i: 5450, c: 6500 }, 'def');
        t.end();
    });

    t.test('scan-related', t => {
        t.test('mixed', t => {
            const army = romans({ numbers: [100,0,0, 10] });
            t.equal(army.isScan(), false, 'isScan');
            t.equal(army.scan, 350, 'scan');
            t.equal(army.scanDef, 200, 'scanDef');
            t.end();
        });
        t.test('legs only', t => {
            const army = romans({ numbers: [100, 0, 0, 0] });
            t.equal(army.isScan(), false, 'isScan');
            t.equal(army.scan, 0, 'scan');
            t.equal(army.scanDef, 0, 'scanDef');
            t.end();
        });
        t.test('scans only', t => {
            const army = romans({ numbers: [0,0,0, 10] });
            t.equal(army.isScan(), true, 'isScan');
            t.equal(army.scan, 350, 'scan');
            t.equal(army.scanDef, 200, 'scanDef');
            t.end();
        });
        t.end();
    });

    t.test('siege', t => {
        const army = romans({
            numbers: [1,2,3, 4,5,6, 7,8, 9,10],
            upgrades:[9,8,7, 6,5,4, 3,2, 1,0]
        });
        t.deepEqual(army.rams, [7, 3], 'rams');
        t.deepEqual(army.cats, [8, 2], 'cats');
        t.end();
    });
    t.end();
});
