import { roundP, zipWith } from '../../../utils';

import { Unit, isSpy, isRam, isCatapult } from '../../types';
import { Side } from './types';
import CombatPoints from './points';

const roundStat = roundP(1e-4);
const add = (a: number, b: number): number => a + b;

export default class Army<S extends Side> {
    protected units: Unit[];
    protected numbers: number[];
    protected upgrades: number[];
    constructor(side: S) {
        this.units = side.units;
        this.numbers = side.numbers;
        this.upgrades = side.upgrades;
    }
    public applyLosses(losses: number) {
        this.numbers = this.numbers.map(n => Math.round(n * (1 - losses)));
    }
    public getTotal(): number {
        return this.numbers.reduce(add, 0);
    }
    public getOff(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => {
                const points = number * this.upgrade(unit, unit.a, upgrade);
                return CombatPoints.off(points, unit.i);
            }, CombatPoints.add, CombatPoints.zero());
    }
    public getDef(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => new CombatPoints(
                this.upgrade(unit, unit.di, upgrade),
                this.upgrade(unit, unit.dc, upgrade),
            ).mul(number),
            CombatPoints.add, CombatPoints.zero());
    }
    public isScan(): boolean {
        return zipWith(
            // EITHER unit is spy, OR there are zero of them
            // which is essentially XOR or !== for boolean
            (spy, zero) => zero !== spy,
            this.units.map(isSpy),
            this.numbers.map(u => u === 0),
        ).every(Boolean);
    }
    get scan(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.s, upgrade)
                : 0,
            add, 0,
        );
    }
    get scanDef(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.ds, upgrade)
                : 0,
            add, 0,
        );
    }
    /** @return rams number and their upgrade level */
    get rams(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isRam(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
    /** @return catapults number and their upgrade level */
    get cats(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isCatapult(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
    // technically a static method
    protected upgrade(unit: Unit, stat: number, level: number): number {
        return roundStat(stat * 1.015 ** level);
    }
    protected foldMap<P>(
        f: (unit: Unit, stat: number, level: number) => P,
        a: (a: P, b: P) => P,
        initial: P,
    ) {
        return zipWith<Unit, number, number, P>(
            f,
            this.units,
            this.numbers,
            this.upgrades,
        ).reduce(a, initial);
    }
}
