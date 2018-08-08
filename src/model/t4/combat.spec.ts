import * as tape from 'tape';

import { extend } from '../../utils';
import { almostEqual, place, def, off } from '../../utils/test';

import combat from './combat';
import units from './units';

tape('combat (new upgrade formula)', (t) => {
    const { upgrade } = combat.Army.prototype;
    almostEqual.call(t, upgrade(units[0][0], 40, 0), 40.0021);
    almostEqual.call(t, upgrade(units[0][0], 40, 20), 52.3623);
    t.end();
});

tape('combat (e2e)', (t) => {
    const tcombat = extend(combat, { units });
    t.test('minor change in upgrades', t => {
        const { offLosses, defLosses } = tcombat.combat(place(), [
            def({ units: units[1], numbers: [999999] }),
            off({ units: units[0], numbers: [499999] }),
        ])[0];
        t.equal(offLosses, 1, 'off');
        t.equal(Math.round(defLosses * 999999), 999931, 'def');
        t.end();
    });
    /**
     * off = 670175 * 65.0021 + 20 * 70.0125
     * def = 999999 * 65.0021 + 10
     * pop_ratio = 2
     * morale = round(pop_ratio ^ (-0.2 * off / def); 3)
     * percent = (off * morale / def) ^ 1.5 / 2
     * cata_morale = 2 ^ -0.3
     */
    t.test('catapults with remorale', t => {
        t.equal(tcombat.combat(
            place({ pop: 1000 }),
            [ def({ units: units[0], numbers: [0,999999] }),
              off({ units: units[2], numbers: [0,670175,0, 0,0,0, 0,20], pop: 2000, targets: [5] }),
            ])[0].buildings[0], 0);
        t.equal(tcombat.combat(
            place({ pop: 1000 }),
            [ def({ units: units[0], numbers: [0,999999] }),
              off({ units: units[2], numbers: [0,670174,0, 0,0,0, 0,20], pop: 2000, targets: [5] }),
            ])[0].buildings[0], 1);
        t.end();
    });
    t.end();
});