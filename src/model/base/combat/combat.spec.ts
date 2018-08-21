import * as tape from 'tape';
import units from '../units';
import buildings from '../buildings';
import TRIBES from '../tribes';

import factory from './factory';
const { place, def, off } = factory({ units, buildings });

import { almostEqual } from '../../../utils/test';

import combat from './combat';
import { CombatResult } from '../../types';

tape('combat (base) per-method', t => {
    combat.place = place({
        wall: 5, pop: 100,
    });
    combat.def = [new combat.Army(def({
        tribe: TRIBES.GAULS, numbers: [100], upgrades: [10] }))];
    combat.offArmy = new combat.Army(combat.off = off({
        tribe: TRIBES.ROMANS, numbers: [0,0,100], upgrades: [0,0,5], pop: 200 }));

    combat.calcBasePoints();
    const offPts = 7540.99;
    const defPts = 4642.16;
    almostEqual.call(t, combat.state.base.off, offPts);
    almostEqual.call(t, combat.state.base.def, defPts);
    combat.state.final.off = combat.state.base.off;
    const wall = +(1.03 ** 5).toFixed(3);
    const morale = +(2 ** -0.2).toFixed(3);

    combat.calcTotalPoints();
    almostEqual.call(t, combat.state.final.off, offPts * morale);
    almostEqual.call(t, combat.state.final.def, (defPts + 10) * wall);
    t.end();
});

tape('combat (base) e2e', t => {
    t.test('classic: 100 imps vs 100 phalx', t => {
        t.test('basic variation', t => {
            const result = combat.combat(
                place({ tribe: TRIBES.GAULS }),
                [ def({ tribe: TRIBES.GAULS, numbers: [100] }),
                  off({ tribe: TRIBES.ROMANS, numbers: [0,0,100] }),
                ]);
            t.equal(result[0].defLosses, 1);
            t.equal(result[0].offLosses.toFixed(3), '0.434');
            t.end();
        });
        t.test('raid', t => {
            const result = combat.combat(
                place({ tribe: TRIBES.GAULS }),
                [ def({ tribe: TRIBES.GAULS, numbers: [100] }),
                  off({ tribe: TRIBES.ROMANS, numbers: [0,0,100], type: 'raid' }),
                ]);
            t.equal(result[0].defLosses.toFixed(3), '0.698');
            t.equal(result[0].offLosses.toFixed(3), '0.302');
            t.end();
        });
        t.test('double-wave', t => {
            const result = combat.combat(
                place({ tribe: TRIBES.GAULS }),
                [ def({ tribe: TRIBES.GAULS, numbers: [100] }),
                  off({ tribe: TRIBES.ROMANS, numbers: [0,0,100], type: 'raid' }),
                  def({ tribe: TRIBES.GAULS, numbers: [100] }),
                  off({ tribe: TRIBES.ROMANS, numbers: [0,0,100], type: 'raid' }),
                ]);
            t.equal(result[0].offLosses.toFixed(3), '0.302');
            t.equal(result[1].offLosses.toFixed(3), '0.391');
            t.end();
        });
        t.end();
    });

    t.test('morale', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: TRIBES.GAULS, pop: 100 }),
            [ def({ tribe: TRIBES.GAULS, numbers: [100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,100], pop: 200 })]);
        t.equal(result[0].offLosses.toFixed(3), '0.533', 'basic morale');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS, pop: 100 }),
            [ def({ tribe: TRIBES.GAULS, numbers: [300] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,100], pop: 200 })]);
        t.equal(result[0].defLosses.toFixed(3), '0.394', 'remorale');
        t.end();
    });

    t.test('scans', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ tribe: TRIBES.GAULS, numbers: [100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses, 0, 'no scans in def');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ tribe: TRIBES.GAULS, numbers: [0,0,100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.432', 'some scans in def');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS, wall: 20 }),
            [ def({ tribe: TRIBES.GAULS, numbers: [0,0,100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.906', '+ wall');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS, wall: 20 }),
            [ def({ tribe: TRIBES.GAULS, numbers: [0,0,100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0,150], pop: 1000 }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.906', '+ moralebonus');
        t.end();
    });

    t.test('catapults', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,0,0, 0,53], targets: [20] }),
            ]);
        t.equal(result[0].buildings[0], 0, '53 catas completely demolish');

        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,0,0, 0,50], targets: [20] }),
            ]);
        t.equal(result[0].buildings[0], 5, '50 catas demolish only partially');

        t.end();
    });

    t.test('rams', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ wall: 20 }),
            [ def({ }),
              off({ numbers: [0,0,0, 0,0,0, 53] }),
            ]);
        t.equal(result[0].wall, 0, '53 rams completely demolish');
        t.equal(combat.state.wall, 10, 'intermediate level is 10');

        t.end();
    });
    t.end();
});
