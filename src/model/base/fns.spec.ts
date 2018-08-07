import * as tape from 'tape';
import { almostEqual } from '../../utils/test';

import fns from './fns';

tape('immensity', t => {
    t.equal(fns.immensity(1000), 1.5, 'lo');
    t.equal(fns.immensity(1000000), 1.2578, 'hi');
    t.end();
});

tape('morale', t => {
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

    t.end();
});

tape('sigma', t => {
    t.equal(fns.sigma(0), 0);
    t.equal(fns.sigma(1), 0.5);
    t.equal(fns.sigma(Infinity), 1);
    t.end();
});

tape('demolish', t => {
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
    catas: number
    upg?: number
    durability?: number
    x: number
    dx?: number
    threshold: number  
};

tape('demolishPoints', t => {
    const testRange = ({
        catas,
        upg = 0,
        durability = 1,
        x,
        dx = 1e-8,
        threshold
    } : RangeTestConfig, msg: string) => {
        t.test(msg, t => {
            const low = fns.demolishPoints(catas, upg, durability, x - dx);
            const high = fns.demolishPoints(catas, upg, durability, x + dx);
            
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
