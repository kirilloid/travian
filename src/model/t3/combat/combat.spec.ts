import * as tape from 'tape';

import units from '../units';
import buildings from '../buildings';
import combat from '.';
import factory from './factory';
import TRIBES from '../tribes';

import { CombatResult } from '../../types';

const { place, def, off } = factory({ units, buildings });

tape('combat (T3)', t => {
    t.test('upgrade', t => {
        const { upgrade } = combat.Army.prototype;
        t.equal(upgrade(units[0][0], 40, 0), 40);
        t.equal(upgrade(units[0][0], 40, 20), 52.4048);
        t.end();
    });

    t.test('stats', t => {
        const army = new combat.Army(off({ numbers: [10] }));
        t.equal(army.getOff().i, 400);
        t.equal(combat.Army.prototype.upgrade(units[0][0], 40, 20), 52.4048);
        t.end();
    });

    t.test('morale', t => {
        let result: CombatResult[];

        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,0,0, 0,50], targets: [20], pop: 1000 }),
            ]);
        t.equal(result[0].buildings[0], 15, '+ moralebonus for catas');
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

    t.test('lone attacker', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,1], upgrades: [0,0,17] })]);
        t.equal(Math.round(result[0].offLosses), 1, 'imperian dies');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,1], upgrades: [0,0,18] })]);
        t.equal(Math.round(result[0].offLosses), 0, 'imperian lives');

        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,1], upgrades: [0,0,0, 0,3], pop: 1000 })]);
        t.equal(Math.round(result[0].offLosses), 1, 'EI dies');
        result = combat.combat(
            place({ tribe: TRIBES.GAULS }),
            [ def({ }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,1], upgrades: [0,0,0, 0,4], pop: 1000 })]);
        t.equal(Math.round(result[0].offLosses), 0, 'EI lives');
        t.end();
    });

    t.test('battles with hero', t => {
        let result: CombatResult[];

        result = combat.combat(
            place({ }),
            [ def({ tribe: TRIBES.GAULS, numbers: [100],
                    hero: { unit: 0, self: 100 }}),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,100],
                    hero: { unit: 2, self: 100 }}),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.520', 'basic stats');

        // hero dies
        result = combat.combat(
            place({ }),
            [ def({ tribe: TRIBES.GAULS, numbers: [100],
                    hero: { unit: 0, self: 100, health: 1 }}),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,100] }),
              def({ tribe: TRIBES.GAULS, numbers: [100] }),
              off({ tribe: TRIBES.ROMANS, numbers: [0,0,100] }),
            ]);
        // (100*70 / 5365 + 100*40 + 10) ** 1.5 ≈ 0.645
        t.equal(result[0].offLosses, 1);
        t.equal(result[0].defLosses.toFixed(3), '0.645', 'first wave, hero dies');
        // (135*40 + 10 / 100*70) ** 1.5 ≈ 0.679
        t.equal(result[1].offLosses.toFixed(3), '0.679', 'second wave, no hero, attackers win');
        t.equal(result[1].defLosses, 1);

        t.end();
    });

    t.end();
});
