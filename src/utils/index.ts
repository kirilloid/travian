export function extend<A, B=Partial<A>>(base: A, mixin: B): A & B {
    // special handling for functions
    if (typeof mixin === 'function') {
        switch (typeof base) {
        case 'undefined':
        case 'function':
            return <A & B><any>mixin;
        default:
            return (<Function><any>mixin)(base);
        }
    }
    // primitives
    if (typeof base !== 'object') {
        return <A&B>mixin;
    }
    // objects
    if (!Array.isArray(base)) {
        let copy = Object.create(Object.getPrototypeOf(base));
        // copy keys from base \ mixin
        for (let key in base) if (base.hasOwnProperty(key)) {
            if (!(key in mixin)) {
                copy[key] = base[key];
            }
        }
        for (let key in mixin) if (mixin.hasOwnProperty(key)) {
            if (mixin[key] !== undefined) {
                if (key in base) {
                    copy[key] = extend((<any>base)[key], mixin[key]);
                } else {
                    copy[key] = mixin[key];
                }
            }
        }
        return copy;
    }
    // array
    let copy = <A&B><any>base.slice();
    for (let index in mixin) if (mixin.hasOwnProperty(index)) {
        if (mixin[index] === undefined) {
            delete copy[index];
        } else {
            copy[index] = index < base.length
                ? extend((<any>base)[index], mixin[index])
                : mixin[index];
        }
    }
    return copy;
}

export const roundP = (precision: number) => (number: number): number =>
    precision * Math.round(number / precision);

export const limit = (lo: number, hi: number) => (n: number): number => Math.min(hi, Math.max(lo, n));

const cmp = (a: any, b: any): number => +(a > b) - +(a < b);

export function sortBy<T, K='string'>(arr: T[], fn: (i: T) => K): T[] {
    return arr.sort((a, b) => cmp(fn(a), fn(b)));
}

export function resSum(res: [number, number, number, number]): number {
    return res[0] + res[1] + res[2] + res[3];
}

export function sum(array: number[]): number {
    return array.reduce((a, b) => a + b, 0);
}

const d = (p: string, n: number): string => (p + ~~n).slice(-2);
export function timeI2S(seconds: number): string {
    return [
        d('', seconds / 3600),
        d('0', (seconds / 60) % 60),
        d('0', seconds % 60)
    ].join(':');
}

export function map<T, S>(item: {[key: string]: T}, fn: (i: T) => S): {[key: string]: S} {
    const copy: {[key: string]: S} = {};
    Object.keys(item)
        .forEach(key => { copy[key] = fn(item[key]); });
    return copy;
}

interface Compose {
    <A, B, C>(f2: (b: B) => C, f1: (a: A) => B): (a: A) => C
    <A, B, C, D>(f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => D
}
export const compose: Compose = (...a: Function[]) => (n: any): any => a.reduceRight((v, f) => f(v), n);

export function zipWith<A, B, C>(fn: (a: A, b: B) => C, a: A[], b: B[]): C[] {
    var n = Math.min(a.length, b.length);
    var out = [];
    for (let i = 0; i < n; i++) {
        out.push(fn(a[i], b[i]));
    }
    return out;
}

export function zipWith3<A, B, C, D>(fn: (a: A, b: B, c: C) => D, a: A[], b: B[], c: C[]): D[] {
    var n = Math.min(a.length, b.length, c.length);
    var out = [];
    for (let i = 0; i < n; i++) {
        out.push(fn(a[i], b[i], c[i]));
    }
    return out;
}
