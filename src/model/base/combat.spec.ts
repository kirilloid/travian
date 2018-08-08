import * as tape from 'tape';
import units from './units';

import { place, def, off } from '../../utils/test';

import combat from './combat';
import { CombatResult } from '../types';

tape('combat e2e (base)', t => {
    t.test('classic: 100 imps vs 100 phalx', t => {
        t.test('basic variation', t => {
            const result = combat.combat(
                place({ tribe: 3 }),
                [ def({ units: units[2], numbers: [100] }),
                  off({ units: units[0], numbers: [0,0,100] }),
                ]);
            t.equal(result[0].defLosses, 1);
            t.equal(result[0].offLosses.toFixed(3), '0.434');
            t.end(); 
        });
        t.test('raid', t => {
            const result = combat.combat(
                place({ tribe: 3 }),
                [ def({ units: units[2], numbers: [100] }),
                  off({ units: units[0], numbers: [0,0,100], type: 'raid' }),
                ]);
            t.equal(result[0].defLosses.toFixed(3), '0.698');
            t.equal(result[0].offLosses.toFixed(3), '0.302');
            t.end();    
        });
        t.test('double-wave', t => {
            const result = combat.combat(
                place({ tribe: 3 }),
                [ def({ units: units[2], numbers: [100] }),
                  off({ units: units[0], numbers: [0,0,100], type: 'raid' }),
                  def({ units: units[2], numbers: [100] }),
                  off({ units: units[0], numbers: [0,0,100], type: 'raid' }),
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
            place({ tribe: 3, pop: 100 }),
            [ def({ units: units[2], numbers: [100] }),
              off({ units: units[0], numbers: [0,0,100], pop: 200 })]);
        t.equal(result[0].offLosses.toFixed(3), '0.533', 'basic morale');
        result = combat.combat(
            place({ tribe: 3, pop: 100 }),
            [ def({ units: units[2], numbers: [300] }),
              off({ units: units[0], numbers: [0,0,100], pop: 200 })]);
        t.equal(result[0].defLosses.toFixed(3), '0.394', 'remorale');
        t.end();
    });

    t.test('scans', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: units[2], numbers: [100] }),
              off({ units: units[0], numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses, 0, 'no scans in def');
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: units[2], numbers: [0,0,100] }),
              off({ units: units[0], numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.432', 'some scans in def');
        result = combat.combat(
            place({ tribe: 3, defBonus: 1.639 }),
            [ def({ units: units[2], numbers: [0,0,100] }),
              off({ units: units[0], numbers: [0,0,0,100] }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.906', '+ wall');
        result = combat.combat(
            place({ tribe: 3, defBonus: 1.639 }),
            [ def({ units: units[2], numbers: [0,0,100] }),
              off({ units: units[0], numbers: [0,0,0,150], pop: 1000 }),
            ]);
        t.equal(result[0].offLosses.toFixed(3), '0.906', '+ moralebonus');
        t.end();
    });

    t.test('catapults', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [], }),
              off({ units: units[0], numbers: [0,0,0, 0,0,0, 0,53], targets: [20] }),
            ]);
        t.equal(result[0].buildings[0], 0, '53 catas completely demolish');
        
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [], }),
              off({ units: units[0], numbers: [0,0,0, 0,0,0, 0,50], targets: [20] }),
            ]);
        t.equal(result[0].buildings[0], 5, '50 catas demolish only partially');

        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [], }),
              off({ units: units[0], numbers: [0,0,0, 0,0,0, 0,50], targets: [20], pop: 1000 }),
            ]);
        t.equal(result[0].buildings[0], 15, '+ moralebonus for catas');
        t.end();
    });

    t.test('lone attacker', t => {
        let result: CombatResult[];
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [] }),
              off({ units: units[0], numbers: [0,0,1], upgrades: [0,0,17] })]);
        t.equal(Math.round(result[0].offLosses), 1, 'imperian dies');
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [] }),
              off({ units: units[0], numbers: [0,0,1], upgrades: [0,0,18] })]);
        t.equal(Math.round(result[0].offLosses), 0, 'imperian lives');

        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [] }),
              off({ units: units[0], numbers: [0,0,0, 0,1], upgrades: [0,0,0, 0,3], pop: 1000 })]);
        t.equal(Math.round(result[0].offLosses), 1, 'EI dies');
        result = combat.combat(
            place({ tribe: 3 }),
            [ def({ units: [] }),
              off({ units: units[0], numbers: [0,0,0, 0,1], upgrades: [0,0,0, 0,4], pop: 1000 })]);
        t.equal(Math.round(result[0].offLosses), 0, 'EI lives');
        t.end();    
    });
    t.end();
});
