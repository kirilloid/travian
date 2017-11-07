function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

export const model = (pairs) => {
    let total = { min: 0, max: 0, mul: 1 };
    pairs.forEach(({ min, max }) => {
        total.min += min;
        total.max += max;
        total.mul *= max - min;
    });
    let variants = pairs.reduce((variants, { min, max }) => {
        let nextVariants = [];
        variants.forEach(({ sum, sign }) => {
            nextVariants.push(
                { sum: sum + min, sign:  sign },
                { sum: sum + max, sign: -sign }
            );
        });
        nextVariants.sort((a, b) => a.sum - b.sum);
        let newVariants = [];
        let last = { sum: -1, sign: 1 };
        for (const variant of nextVariants) {
            if (variant.sum === last.sum) {
                last.sign += variant.sign;
            } else {
                newVariants.push(last = variant);
            }
        }
        return newVariants;
    }, [{ sum: 0, sign: 1 }]);
    const avg = (total.max + total.min) / 2;
    const calc = (value) => {
        if (value <= total.min) return 1;
        let sum = 0;
        for (const item of variants) {
            if (value <= item.sum) break;
            sum += (value - item.sum) ** pairs.length * item.sign;
        }
        return 1 - sum / total.mul / factorial(pairs.length);
    }
    return value => (value < avg)
        ? calc(value)
        : 1 - calc(2 * avg - value);
};


function generateRange(min, max, SCALE) {
    const roundMin = Math.round(min * SCALE);
    const roundMax = Math.round(max * SCALE);
    let range = [];
    let head = roundMin - (min * SCALE) + 0.5;
    range.push(head);
    for (let i = roundMin + 1; i < roundMax; i++) range.push(1);
    let tip = 0.5 - roundMax + (max * SCALE);
    if (tip > 0) range.push(tip);
    return range;
}

export const numericFloat = (precision = 2) => (pairs) => {
    const SCALE = 10 ** precision;
    let total = { min: 0, max: 0, mul: 1 };
    let range = [1];
    pairs.forEach(({ min, max }) => {
        total.min += Math.round(min * SCALE) / SCALE;
        total.max += Math.round(max * SCALE) / SCALE;
        total.mul *= (max - min) * SCALE;
        let current = generateRange(min, max, SCALE);
        let rangeMul = Array(range.length + current.length - 1).fill(0);
        range.forEach((n, i) => {
            current.forEach((m, j) => {
                rangeMul[i + j] += n * m;
            });
        });
        range = rangeMul;
    });
    var sum = 0;
    for (let i = range.length - 1; i >= 0; i--) {
        sum += range[i];
        range[i] = sum;
    }
    return value => {
        if (value <= total.min) return 1;
        if (value >= total.max) return 0;
        let point = Math.round((value - total.min) * SCALE);
        return range[point] / total.mul;
    };
};

const normalTable = [
    .50000, .50399, .50798, .51197, .51595, .51994, .52392, .52790, .53188, .53586,
    .53983, .54380, .54776, .55172, .55567, .55962, .56356, .56749, .57142, .57535,
    .57926, .58317, .58706, .59095, .59483, .59871, .60257, .60642, .61026, .61409,
    .61791, .62172, .62552, .62930, .63307, .63683, .64058, .64431, .64803, .65173,
    .65542, .65910, .66276, .66640, .67003, .67364, .67724, .68082, .68439, .68793,
    .69146, .69497, .69847, .70194, .70540, .70884, .71226, .71566, .71904, .72240,
    .72575, .72907, .73237, .73565, .73891, .74215, .74537, .74857, .75175, .75490,
    .75804, .76115, .76424, .76730, .77035, .77337, .77637, .77935, .78230, .78524,
    .78814, .79103, .79389, .79673, .79955, .80234, .80511, .80785, .81057, .81327,
    .81594, .81859, .82121, .82381, .82639, .82894, .83147, .83398, .83646, .83891,

    .84134, .84375, .84614, .84849, .85083, .85314, .85543, .85769, .85993, .86214,
    .86433, .86650, .86864, .87076, .87286, .87493, .87698, .87900, .88100, .88298,
    .88493, .88686, .88877, .89065, .89251, .89435, .89617, .89796, .89973, .90147,
    .90320, .90490, .90658, .90824, .90988, .91149, .91309, .91466, .91621, .91774,
    .91924, .92073, .92220, .92364, .92507, .92647, .92785, .92922, .93056, .93189,
    .93319, .93448, .93574, .93699, .93822, .93943, .94062, .94179, .94295, .94408,
    .94520, .94630, .94738, .94845, .94950, .95053, .95154, .95254, .95352, .95449,
    .95543, .95637, .95728, .95818, .95907, .95994, .96080, .96164, .96246, .96327,
    .96407, .96485, .96562, .96638, .96712, .96784, .96856, .96926, .96995, .97062,
    .97128, .97193, .97257, .97320, .97381, .97441, .97500, .97558, .97615, .97670,
    .97725, .97778, .97831, .97882, .97932, .97982, .98030, .98077, .98124, .98169,

    .98214, .98257, .98300, .98341, .98382, .98422, .98461, .98500, .98537, .98574,
    .98610, .98645, .98679, .98713, .98745, .98778, .98809, .98840, .98870, .98899,
    .98928, .98956, .98983, .99010, .99036, .99061, .99086, .99111, .99134, .99158,
    .99180, .99202, .99224, .99245, .99266, .99286, .99305, .99324, .99343, .99361,
    .99379, .99396, .99413, .99430, .99446, .99461, .99477, .99492, .99506, .99520,
    .99534, .99547, .99560, .99573, .99585, .99598, .99609, .99621, .99632, .99643,
    .99653, .99664, .99674, .99683, .99693, .99702, .99711, .99720, .99728, .99736,
    .99744, .99752, .99760, .99767, .99774, .99781, .99788, .99795, .99801, .99807,
    .99813, .99819, .99825, .99831, .99836, .99841, .99846, .99851, .99856, .99861,
    .99865, .99869, .99874, .99878, .99882, .99886, .99889, .99893, .99896, .99900,

    .99903, .99906, .99910, .99913, .99916, .99918, .99921, .99924, .99926, .99929,
    .99931, .99934, .99936, .99938, .99940, .99942, .99944, .99946, .99948, .99950,
    .99952, .99953, .99955, .99957, .99958, .99960, .99961, .99962, .99964, .99965,
    .99966, .99968, .99969, .99970, .99971, .99972, .99973, .99974, .99975, .99976,
    .99977, .99978, .99978, .99979, .99980, .99981, .99981, .99982, .99983, .99983,
    .99984, .99985, .99985, .99986, .99986, .99987, .99987, .99988, .99988, .99989,
    .99989, .99990, .99990, .99990, .99991, .99991, .99992, .99992, .99992, .99992,
    .99993, .99993, .99993, .99994, .99994, .99994, .99994, .99995, .99995, .99995,
    .99995, .99995, .99996, .99996, .99996, .99996, .99996, .99996, .99997, .99997];

function normal(sigmas) {
    if (sigmas < 0) return 1 - normal(-sigmas);
    if (Math.abs(sigmas) >= 3.99) return 1;
    const lo = Math.floor(sigmas * 100);
    const hi = lo + 1;
    return normalTable[hi] * (sigmas * 100 - lo)
         + normalTable[lo] * (hi - sigmas * 100);
}

export const normalApprox = (pairs) => {
    let total = { min: 0, max: 0, avg: 0, disp: 0 };
    pairs.forEach(({ min, max }) => {
        total.min += min;
        total.max += max;
        total.avg += (max + min) / 2;
        total.disp += (max - min) ** 2 / 12;
    });
    const sigma = Math.sqrt(total.disp);
    return value => 1 - normal((value - total.avg) / sigma);
};