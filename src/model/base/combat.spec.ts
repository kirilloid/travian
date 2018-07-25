import tape from 'tape';

import { sigma, demolishPoints, demolish } from './combat';

tape('sigma', t => {
    t.equal(sigma(0), 0);
    t.equal(sigma(1), 0.5);
    t.equal(sigma(Infinity), 1);
    t.end();
});

tape('demolish', t => {
    t.equal(demolish(6, 0), 6, 'lower edge');
    t.equal(demolish(6, 6), 6, 'before the first cliff');
    t.equal(demolish(6, 7), 5, 'after the first cliff');
    t.equal(demolish(6, 15), 4, 'before mid cliff');
    t.equal(demolish(6, 16), 3, 'after mid cliff');
    t.equal(demolish(6, 21), 1, 'before the last cliff');
    t.equal(demolish(6, 21.5), 0, 'exactly the last cliff');
    t.equal(demolish(6, 22), 0, 'over the last cliff');
    t.end();
});

tape('demolishPoints', t => {
    const testRange = ({
        catas,
        upg = 0,
        durability = 1,
        x,
        dx = 1e-8,
        threshold
    }, msg) => {
        t.test(msg, t => {
            const low = demolishPoints(catas, upg, durability, x - dx);
            const high = demolishPoints(catas, upg, durability, x + dx);
            
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
