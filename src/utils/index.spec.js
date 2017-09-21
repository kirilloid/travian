import { extend } from './index.js';
import tape from 'tape';

tape('extend', t => {
    t.test('primitive', t => {
        t.equal(extend(1, 2), 2, 'primitive is just overwritten');
        t.end();
    });
    t.test('objects', t => {
        var a = { a: 1 };
        t.deepEqual(extend(a, { b: 2 }), { a: 1, b: 2 }, 'property is added');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.deepEqual(extend(a, { a: 2 }), { a: 2 }, 'property is overwritten');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.deepEqual(extend(a, { a: undefined }), {}, 'property is removed');
        t.deepEqual(a, { a: 1 }, 'original is not modified');
        t.end();
    });
    t.test('arrays', t => {
        var a = [0, 1];
        var a2 = extend(a, [2]);
        t.deepEqual(a2, [2, 1], 'index is replaced');
        t.ok(Array.isArray(a2), 'remains an array');
        t.deepEqual(a, [0, 1], 'original is not modified');
        var a02 = extend(a, {1: 2});
        t.deepEqual(a02, [0, 2], 'updated by index');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a02), 'remains an array');        
        var a012 = extend(a, {2: 2});
        t.deepEqual(a012, [0, 1, 2], 'value is added to the end');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a012), 'remains an array');        
        var a0 = extend(a, {length: 1});
        t.deepEqual(a0, [0], 'array is trimmed');
        t.deepEqual(a, [0, 1], 'original is not modified');
        t.ok(Array.isArray(a0), 'remains an array');        
        t.end();
    });
    t.test('objects.deep', t => {
        var a = { w: { a: 1 } };
        t.deepEqual(extend(a, { w: { b: 2 } }), { w: { a: 1, b: 2 } }, 'property is added');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.deepEqual(extend(a, { w: { a: 2 } }), { w: { a: 2 } }, 'property is overwritten');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.deepEqual(extend(a, { w: { a: undefined } }), { w: {} }, 'property is removed');
        t.deepEqual(a, { w: { a: 1 } }, 'original is not modified');
        t.end();
    });
    t.test('arrays.deep', t => {
        var a = [[0, 1], [2, 3]];
        t.deepEqual(extend(a, [[4], {1:5}]), [[4, 1], [2, 5]], 'nested propeties changed');
        t.deepEqual(a, [[0, 1], [2, 3]], 'original is not modified');
        t.end();
    });
    t.test('mixed.deep', t => {
        var a = [{ x: 1, y: [2] }, { x: 3, y: [4] }];
        var a5 = extend(a, [{ x: 5 }]);
        t.deepEqual(a5, [{ x: 5, y: [2] }, { x: 3, y: [4] }], 'nested propety changed');
        t.equal(a[1], a5[1], 'sibling object copied by reference');
        t.equal(a[0].y, a5[0].y, 'sibling property copied by reference');
        t.end();
    });
    t.end();
});