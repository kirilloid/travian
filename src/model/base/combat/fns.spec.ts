import * as tape from 'tape';
import { almostEqual } from '../../../utils/test';
import units from '../units';

import fns from './fns';
import CombatPoints from './points';

tape('combat-fns', t => {
    t.test('immensity', t => {
        t.equal(fns.immensity(1000), 1.5, 'lo');
        t.equal(fns.immensity(1000000), 1.2578, 'hi');
        t.end();
    });

    t.test('morale', t => {
        // anomaly around 3 pop
        t.equal(fns.morale(1, 1), 1);
        t.equal(fns.morale(2, 1), 1.084);
        t.equal(fns.morale(3, 1), 1);
        almostEqual.call(t, fns.morale(4, 1), 0.944);

        t.equal(fns.morale(2, 2), 1);
        t.equal(fns.morale(3, 2), 1);
        almostEqual.call(t, fns.morale(4, 2), 0.944);

        t.equal(fns.morale(3, 3), 1);
        almostEqual.call(t, fns.morale(4, 3), 0.944);
        almostEqual.call(t, fns.morale(4, 3), 0.944);

        // regular ratio
        t.equal(fns.morale(100, 10), 0.667);
        t.equal(fns.morale(50, 10), 0.725);
        t.equal(fns.morale(20, 10), 0.871);
        t.equal(fns.morale(100, 100), 1);
        t.equal(fns.morale(10, 100), 1);

        // remorale
        t.equal(fns.morale(100, 10, 0.5), 0.794);
        t.equal(fns.morale(20, 10, 2), 0.871);

        t.end();
    });

    t.test('sigma', t => {
        t.equal(fns.sigma(0), 0);
        t.equal(fns.sigma(1), 0.5);
        t.equal(fns.sigma(Infinity), 1);
        t.end();
    });

    t.test('adducedDef', t => {
        const [off, def] = fns.adducedDef(
            new CombatPoints(50 * units[2][1].a, 100 * units[2][3].a),
            new CombatPoints(100 * units[0][1].di, 100 * units[0][1].dc),
        );
        t.equal(off, 12250);
        almostEqual.call(t, def, 4295.9);
        t.end();
    });

    t.test('wallDurability', t => {
        // romans 20
        [0,  39,  74, 105, 132, 155, 174, 189, 200, 207, 210,
            230, 281, 334, 390, 449, 510, 573, 639, 708, 779].forEach((v, l) => {
            t.equal(fns.demolishWall(1, 20, v*(1-Number.EPSILON)), Math.max(0,Math.min(20,21-l)));
            t.equal(fns.demolishWall(1, 20, v), 20-l);
        });
        // tuetons 20
        [0, 195, 370, 525, 660, 775, 870, 945,1000,1035,1050,
        1150,1405,1672,1952,2245,2550,2867,3197,3540,3895].forEach((v, l) => {
            t.equal(fns.demolishWall(5, 20, v*(1-Number.EPSILON)), Math.max(0,Math.min(20,21-l)));
            t.equal(fns.demolishWall(5, 20, v), 20-l);
        });
        // gauls 19
        [0,  74, 140, 198, 248, 290, 324, 350, 368, 378,
            420, 522, 629, 741, 858, 980,1107,1239,1376,1518].forEach((v, l) => {
            t.equal(fns.demolishWall(2, 19, v*(1-Number.EPSILON)), Math.max(0,Math.min(19,20-l)));
            t.equal(fns.demolishWall(2, 19, v), 19-l);
        });
        t.end();
    });

    t.test('demolish', t => {
        t.equal(fns.demolish(6, 0), 6, 'lower edge');
        t.equal(fns.demolish(6, 6), 6, 'before the first cliff');
        t.equal(fns.demolish(6, 7), 5, 'after the first cliff');
        t.equal(fns.demolish(6, 15), 4, 'before mid cliff');
        t.equal(fns.demolish(6, 16), 3, 'after mid cliff');
        t.equal(fns.demolish(6, 21), 1, 'before the last cliff');
        t.equal(fns.demolish(6, 21.5), 0, 'exactly the last cliff');
        t.equal(fns.demolish(6, 22), 0, 'over the last cliff');
        t.end();
    });

    type RangeTestConfig = {
        catas: number,
        upg?: number,
        durability?: number,
        x: number,
        dx?: number,
        threshold: number,
    };

    t.test('demolishPoints', t => {
        const testRange = (
            {   catas,
                upg = 0,
                durability = 1,
                x,
                dx = 1e-8,
                threshold,
            } : RangeTestConfig,
            msg: string,
        ) => {
            t.test(msg, t => {
                const low = fns.demolishPoints(catas, upg, durability, x - dx, 1);
                const high = fns.demolishPoints(catas, upg, durability, x + dx, 1);

                if (low < threshold
                &&  high > threshold) {
                    t.ok(true);
                } else {
                    t.fail(`Not in range: ${low} ≤ ${threshold} ≤ ${high}`);
                }
                t.end();
            });
        };
        testRange({ catas: 1, x: 0.825481812, threshold: 1.5 }, 'basic level 1');
        testRange({ catas: 13, x: 0.88100169, threshold: 21.5 }, 'basic level 6');
        testRange({ catas: 100, durability: 1.3, x: 0.18910846, threshold: 12.5 }, 'stonemason');
        testRange({ catas: 230, durability: 3, upg: 1, x: 0.1866283009, dx: 1e-10, threshold: 12.5 }, 'art & upgrades');
        t.end();
    });
    t.end();
});
