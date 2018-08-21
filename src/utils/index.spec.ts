import { extend, sortBy, roundP, map, timeI2S, limit, compose } from '.';
import * as tape from 'tape';

tape('extend', t => {
    t.test('primitive', t => {
        t.equal(extend(1, 2), 2, 'primitive is just overwritten');
        t.end();
    });
    t.test('objects', t => {
        const a = { a: 1 };
        t.deepEqual(extend(a, { b: 2 }), { a: 1, b: 2 }, 'property is added');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.deepEqual(extend(a, { a: 2 }), { a: 2 }, 'property is overwritten');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.deepEqual(extend(a, { a: undefined }), {}, 'property is removed');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.end();
    });
    t.test('arrays', t => {
        const a = [0, 1];
        const a2 = extend(a, [2]);
        t.deepEqual(a2, [2, 1], 'index is replaced');
        t.ok(Array.isArray(a2), 'remains an array');
        t.deepEqual(a, [0, 1], 'original is not modified');
        const a02 = extend(a, {1: 2});
        t.deepEqual(a02, [0, 2], 'updated by index');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a02), 'remains an array');
        const a012 = extend(a, {2: 2});
        t.deepEqual(a012, [0, 1, 2], 'value is added to the end');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a012), 'remains an array');
        const a0 = extend(a, {length: 1});
        t.deepEqual(a0, [0], 'array is trimmed');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a0), 'remains an array');
        t.end();
    });
    t.test('objects.deep', t => {
        const a = { w: { a: 1 } };
        t.deepEqual(extend(a, { w: { b: 2 } }), { w: { a: 1, b: 2 } }, 'property is added');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.deepEqual(extend(a, { w: { a: 2 } }), { w: { a: 2 } }, 'property is overwritten');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.deepEqual(extend(a, { w: { a: undefined } }), { w: {} }, 'property is removed');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.end();
    });
    t.test('arrays.deep', t => {
        const a = [[0, 1], [2, 3]];
        t.deepEqual(extend(a, [[4], {1:5}]), [[4, 1], [2, 5]], 'nested propeties changed');
        t.deepEqual(a, [[0, 1], [2, 3]], 'original is not modified');
        t.end();
    });
    t.test('mixed.deep', t => {
        const a = [{ x: 1, y: [2] }, { x: 3, y: [4] }];
        const a5 = extend<{x: number, y: number[]}[], {x: number}[]>(a, [{ x: 5 }]);
        t.deepEqual(a5, [{ x: 5, y: [2] }, { x: 3, y: [4] }], 'nested propety changed');
        t.equal(a[1], a5[1], 'sibling object copied by reference');
        t.equal(a[0].y, a5[0].y, 'sibling property copied by reference');
        t.end();
    });
    t.test('classes', t => {
        class A {}
        class B extends A {}
        const b = new B();
        const b2 = extend(b, { x: 5 });
        t.deepEqual(b2, { x: 5 }, 'property is added');
        t.ok(b2 instanceof B, 'prototype hierarchy is preserved');
        t.end();
    });
    t.test('functions', t => {
        const a1 = { a: 1 };
        const b1 = extend(a1, { a: (x: number) => x + 1 });
        t.deepEqual(b1, { a: 2 }, 'propety is changed');
        const a2 = { f: () => {} };
        const f = () => {};
        const b2 = extend(a2, { f });
        t.deepEqual(b2, { f }, 'function is overriden');
        const c = extend({}, { f });
        t.deepEqual(c, { f }, 'function is re-defined on missing property');
        t.end();
    });
    t.end();
});

tape('roundP', t => {
    t.test('default rounding with base = 1', t => {
        t.equal(roundP(1)(2), 2, '2 -> 2');
        t.equal(roundP(1)(2.5), 3, '2.5 -> 3');
        t.end();
    });
    t.test('rounding with base = 2', t => {
        t.equal(roundP(2)(2), 2, '2 -> 2');
        t.equal(roundP(2)(2.5), 2, '2.5 -> 2');
        t.end();
    });
    t.test('rounding with base = 0.5', t => {
        t.equal(roundP(0.5)(2), 2, '2 -> 2');
        t.equal(roundP(0.5)(2.5), 2.5, '2.5 -> 2.5');
        t.end();
    });
    t.test('rounding with base = 0.5', t => {
        const round = roundP(1);
        for (let i = 0; i < 10; i++) {
            const x = 100 * Math.random() - 50;
            t.equal(round(x), Math.round(x), `${x} with Math.round`);
        }
        t.end();
    });
    t.end();
});

tape('map', t => {
    const a = { a: 1 };
    const a2 = map(a, x => x * 2);
    t.deepEqual(a2, { a: 2 });
    t.deepEqual(a, { a: 1 }, 'original is not modified');
    t.end();
});

tape('sortBy', t => {
    const a = [1, 10, 4];
    sortBy(a, x => x);
    t.deepEqual(a, [1, 4, 10], 'by default number are sorted properly');
    sortBy(a, x => -x);
    t.deepEqual(a, [10, 4, 1], 'inverse sort');
    t.end();
});

tape('timeI2S', t => {
    t.equal(timeI2S(0), "0:00:00", 'zero');
    t.equal(timeI2S(1), "0:00:01", 'a second');
    t.equal(timeI2S(70), "0:01:10", 'minute+');
    t.equal(timeI2S(1234), "0:20:34", '1234');
    t.equal(timeI2S(3661), "1:01:01", 'hour+minute+day');
    t.equal(timeI2S(86400), "24:00:00", 'a day');
    t.end();
});

tape('limit', t => {
    const limit1 = limit(1, 3);
    t.equal(limit1(0), 1, 'below bound');
    t.equal(limit1(1), 1, 'low-bound');
    t.equal(limit1(2), 2, 'in-bound');
    t.equal(limit1(3), 3, 'high-bound');
    t.equal(limit1(4), 3, 'higher bound');
    t.end();
});

tape('compose', t => {
    const p5 = (x: number) => x + 5;
    const m2 = (x: number) => x * 2;
    t.equal(compose(p5, m2)(1), 7, '1 *2 +5');
    t.equal(compose(m2, p5)(1),12, '1 +5 *2');
    t.end();
});
