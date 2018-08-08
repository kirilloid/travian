import tape from 'tape';

import { extend } from './';
import { Place, Def, Off, Unit } from '../model/types';

export function almostEqual(this: tape.Test, a: number, b: number, msg: string) {
    if (Math.abs(a - b) / Math.min(a, b) <= Number.EPSILON) {
        this.ok(true, msg);
    } else {
        this.equal(a, b, msg);
    }
}

const ZEROES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export function place(obj: Partial<Place> = {}) {
    return extend({
        tribe: 1,
        pop: 100,
        def: 0,
        defBonus: 1,
        durBonus: 1,
        party: false
    }, obj);
}

export function def(obj: Partial<Def> & { units: Unit[] }): Def {
    return extend({
        kind: 'def',
        numbers: ZEROES,
        upgrades: ZEROES,
    }, obj);
}

export function off(obj: Partial<Off> & { units: Unit[] }): Off {
    return extend({
        kind: 'off',
        pop: 100,
        numbers: ZEROES,
        upgrades: ZEROES,
        type: 'attack',
        targets: [],
        // hero: Hero
        // metallurgy: number
        party: false,
        brew: 0
    }, obj);
}