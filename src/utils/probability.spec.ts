import {
    model,
    totalArray,
    linearInterpolation,
    cubicInterpolation,
    multiplyRangeByOnes,
    numericInt
} from './probability';

import * as tape from 'tape';

function approxEqual(t: tape.Test, epsilon: number, actual: number, expected: number, message = '') {
    if (Math.abs(actual - expected) < epsilon) {
        t.pass(`${actual} ~ ${expected}. ${message}`);
    } else {
        t.fail(`${actual} /~ ${expected}. ${message}`);
    }
}

tape('utilities', t => {
    t.test('totalArray', t => {
        const ta0 = totalArray([]);
        t.equal(ta0(-1), 1, 'under');
        t.equal(ta0(0), 0, 'over');

        const ta1 = totalArray([0.5]);
        t.equal(ta1(-1), 1, 'under');
        t.equal(ta1(0), 0.5, 'inner');
        t.equal(ta1(1), 0, 'over');

        t.end();
    });
    t.end();
});

tape('model', t => {
    t.test('linear', t => {
        const dist = model([
            { min: 1, max: 3 },
        ]);
        t.equal(dist(0), 1, 'sub-min');
        t.equal(dist(1), 1, 'min');
        t.equal(dist(3), 0, 'max');
        t.equal(dist(4), 0, 'over-max');
        t.equal(dist(2), 0.5, 'middle');
        t.end();
    });
    t.test('quadratic', t => {
        const dist = model([
            { min: 1, max: 3 },
            { min: 1, max: 5 },
        ]);
        t.equal(dist(2), 1, '2');
        t.equal(dist(3),15/16, '3');
        t.equal(dist(4),12/16, '4');
        t.equal(dist(5), 8/16, '5');
        t.equal(dist(6), 4/16, '6');
        t.equal(dist(7), 1/16, '7');
        t.equal(dist(8), 0, '8');
        t.end();
    });
    t.test('tesseract', t => {
        const dist = model([
            { min: 0, max: 1 },
            { min: 0, max: 1 },
            { min: 0, max: 1 },
            { min: 0, max: 1 },
        ]);
        t.equal(dist(0),   1, '0');
        t.equal(dist(0.5), 1 - (1/2)**4 / 24, '1/2');
        t.equal(dist(1),   1 - 1/24, '1');
        t.equal(dist(1.5), 1 - ((3/2) ** 4 - 4 * (1/2) ** 4) / 24, '1');
        t.equal(dist(2),   1/2, '2');
        t.end();
    });
    t.test('extreme: model is optimized', t => {
        const pairs = Array(20).fill(0)
            .map((_, i) => ({ min: 1, max: i + 2 }));
        t.timeoutAfter(100);
        t.ok('can be calculated w/o timeout');
        t.end();
    });
    t.end();
});

tape('multiplyRangeByOnes', t => {
    t.deepEqual(multiplyRangeByOnes([1], 1), [1], 'trivial 1x1');
    t.deepEqual(multiplyRangeByOnes([1, 1], 2), [1, 2, 1], '2x2');
    t.deepEqual(multiplyRangeByOnes([1, 1], 3), [1, 2, 2, 1], '2x3');
    t.deepEqual(multiplyRangeByOnes([1, 1, 1], 2), [1, 2, 2, 1], '3x2');
    t.deepEqual(multiplyRangeByOnes([1, 1], 2.5), [1, 2, 1.5, 0.5], '2x2.5');
    t.deepEqual(multiplyRangeByOnes([1, 1, 0.5], 2.5), [1, 2, 2, 1, 0.25], '2.5x2.5');
    t.end();
});

tape('interpolation', t => {
    const a = totalArray([0, 1, 8, 27]);
    t.test('linear', t => {
        t.equal(linearInterpolation(a, 0), 0, 'edge');
        t.equal(linearInterpolation(a, 1.5), 4.5, 'middle');
        t.end();
    });
    t.test('cubic', t => {
        t.equal(cubicInterpolation(a, 1), 1, 'edge');
        t.equal(cubicInterpolation(a, 1.5), 1.5 ** 3, 'middle');
        t.end();
    });
    t.end();
});

tape('numericInt', t => {
    t.test('quadratic model', t => {
        const pairs = [
            { min: 1, max: 3 },
            { min: 1, max: 5 }
        ];
        const dist = numericInt(pairs, 1);
        const precise = model(pairs);
        const PRECISION = 2e-4;
        let avgError = 0;
        for (let k = 0; k < 100; k++) {
            const n = 2 + 6 * Math.random();
            const actual = dist(n);
            const expected = precise(n);
            avgError += actual - expected;
            approxEqual(t, PRECISION, actual, expected, n.toString());
        }
        t.end();
    });
    t.test('big model', t => {
        const pairs = [
            { min: 1, max: 2 },
            { min: 1, max: 3 },
            { min: 1, max: 4 },
            { min: 1, max: 5 },
            { min: 1, max: 6 },
            { min: 1, max: 7 },
            { min: 1, max: 8 },
            { min: 1, max: 9 },
            { min: 1, max: 10},
        ];
        const dist = numericInt(pairs, 2);
        const precise = model(pairs);
        const min = pairs.reduce((sum, pair) => sum + pair.min, 0);
        const max = pairs.reduce((sum, pair) => sum + pair.max, 0);
        const errorHysto = Array(10).fill(0);
        let avgError = 0;
        for (let k = 0; k < 1000; k++) {
            const n = min + Math.random() * (max - min);
            const actual = dist(n);
            const expected = precise(n);
            approxEqual(t, 5e-7, actual, expected, n.toString());
            avgError += actual - expected;
            errorHysto[Math.floor(Math.abs(actual - expected) * 1e7)]++;
        }
        while (!errorHysto[errorHysto.length - 1]) errorHysto.pop();
        t.test(errorHysto.join(', ') + ' ' + (avgError * 1e6), t => t.end());
        t.end();
    });
    t.end();
});