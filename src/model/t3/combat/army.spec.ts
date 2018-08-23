import * as tape from 'tape';

import units from '../units';
import buildings from '../buildings';
import factory from './factory';
import Army from './army';
import TRIBES from '../tribes';

const f = factory({ units, buildings });

tape('combat: off army (T3)', t => {
    let army: Army;
    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,10],
        hero: { unit: 2 }}));
    t.deepEqual(army.getOff(), { i: 790, c: 0 }, 'base hero');

    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,100],
        hero: { unit: 2, self: 100 }}));
    t.deepEqual(army.getOff(), { i: 14505, c: 0 }, 'high skill');

    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,100],
        hero: { unit: 2, bonus: 100 }}));
    t.deepEqual(army.getOff(), { i: 8508, c: 0 }, 'high leadership');

    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,0, 0,0,50],
        hero: { unit: 5, self: 50 }}));
    t.deepEqual(army.getOff(), { i: 0, c: 16600 }, 'high skill, cavalry');

    t.end();
});

tape('combat: def army (T3)', t => {
    let army: Army;
    army = new Army(f.def(
        { tribe: TRIBES.GAULS, numbers: [10],
        hero: { unit: 0 }}));
    t.deepEqual(army.getDef(), { i: 465, c: 585 }, 'base hero');

    army = new Army(f.def(
        { tribe: TRIBES.GAULS, numbers: [100],
        hero: { unit: 0, self: 100 }}));
    t.deepEqual(army.getDef(), { i: 9365, c: 11290 }, 'high skill');

    army = new Army(f.off(
        { tribe: TRIBES.GAULS, numbers: [100],
        hero: { unit: 0, bonus: 100 }}));
    t.deepEqual(army.getDef(), { i: 4065*1.2, c: 5085*1.2 }, 'high leadership');
    t.end();
});

tape('losses', t => {
    let army: Army;
    army = new Army(f.off({ tribe: TRIBES.ROMANS, hero: { unit: 0, health: 50 }}));
    army.applyLosses(0.5);
    t.deepEqual(army.getOff(), { i: 0, c: 0 }, 'hero is dead');

    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,100],
        hero: { unit: 2, self: 100 }}));
    t.deepEqual(army.getOff(), { i: 14505, c: 0 }, 'high skill');

    army = new Army(f.off(
        { tribe: TRIBES.ROMANS, numbers: [0,0,100],
        hero: { unit: 2, bonus: 100 }}));
    t.deepEqual(army.getOff(), { i: 8508, c: 0 }, 'high leadership');
    t.end();
});
