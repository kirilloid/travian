import { extend, compose, roundP, limit } from '../../utils';

import combat from '../t4/combat/combat';

const immensity = compose(
    roundP(0.0001),
    limit(1.22, 1.5),
    (n: number) => 3.7963073 - 2 * n ** 0.02);

const raid = (x: number) => {
    if (x <= 0.032) { return [1, x]; }
    if (x >= 31.25) { return [1 / x, 1]; }
    const y = 1.032 / (1 + x);
    return [y, 1.032 - y];
};

export default extend(combat, { fns: { raid, immensity } });

// items from heroes affect all matching troops, the strongest one is chosen
// https://forum.kingdoms.com/thread/17210-how-heroes-defence-bonus-works/?postID=113487#post113487
