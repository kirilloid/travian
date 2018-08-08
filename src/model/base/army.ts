import { roundP, zipWith, zipWith3 } from '../../utils';

import { Unit, CombatPoints, Side, isSpy, isRam, isCatapult } from '../types';

const roundStat = roundP(1e-4);
const add = (a: number, b: number): number => a + b;
export const addCP = (a: CombatPoints, b: CombatPoints): CombatPoints =>
    ({ i: a.i + b.i, c: a.c + b.c })
const zeroCP: CombatPoints = { i: 0, c: 0 };

export default class Army {
    private units: Unit[];
    private numbers: number[];
    private upgrades: number[];
    constructor(side: Side) {
        this.units = side.units;
        this.numbers = side.numbers;
        this.upgrades = side.upgrades;
    }
    applyLosses(percent: number) {
        this.numbers = this.numbers.map(n => Math.round(n * (1 - percent)));
    }
    upgrade(unit: Unit, stat: number, level: number): number {
        return roundStat(stat + (stat + 300 * unit.u / 7) * (1.007 ** level - 1));
    }
    foldMap<P=number>(
        f: (unit: Unit, stat: number, level: number) => P,
        a: (a: P, b: P) => P,
        initial: P
    ) {
        return zipWith3(
            f,
            this.units,
            this.numbers,
            this.upgrades
        ).reduce(a, initial);
    }
    get total(): number {
        return this.foldMap((_, number) => number, add, 0);
    }
    get off(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => {
                const points = number * this.upgrade(unit, unit.a, upgrade);
                return unit.i ? { i: points, c: 0 } : { i: 0, c: points };
            }, addCP, zeroCP);
    }
    get def(): CombatPoints {
        return this.foldMap(
            (unit, number, upgrade) => ({
                i: number * this.upgrade(unit, unit.di, upgrade),
                c: number * this.upgrade(unit, unit.dc, upgrade)
            }),
            addCP, zeroCP);
    }
    isScan(): boolean {
        return zipWith(
            (spy, zero) => zero || spy,
            this.units.map(isSpy),
            this.numbers.map(u => u === 0)
        ).every(Boolean);
    }
    get scan(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.s, upgrade)
                : 0,
            add, 0
        );
    }
    get scanDef(): number {
        return this.foldMap(
            (unit, number, upgrade) => isSpy(unit)
                ? number * this.upgrade(unit, unit.ds, upgrade)
                : 0,
            add, 0
        );
    }
    get rams(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isRam(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
    get cats(): [number, number] {
        for (let i = 0; i < 10; i++) {
            if (isCatapult(this.units[i])) {
                return [this.numbers[i], this.upgrades[i]];
            }
        }
        return [0, 0];
    }
}
