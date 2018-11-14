export function extend<A, B=Partial<A>>(base: A, mixin: B): A & B {
    // special handling for functions
    if (typeof mixin === 'function') {
        switch (typeof base) {
        case 'undefined':
        case 'function':
            return mixin as any as A & B;
        default:
            return (mixin)(base);
        }
    }
    // primitives
    if (typeof base !== 'object') {
        return mixin as A & B;
    }
    // objects
    if (!Array.isArray(base)) {
        const copy = Object.create(Object.getPrototypeOf(base));
        // copy keys from base \ mixin
        for (const key in base) { if (base.hasOwnProperty(key)) {
            if (!(key in mixin)) {
                copy[key] = base[key];
            }
        } }
        for (const key in mixin) { if (mixin.hasOwnProperty(key)) {
            if (mixin[key] !== undefined) {
                if (key in base) {
                    copy[key] = extend((base as any)[key], mixin[key]);
                } else {
                    copy[key] = mixin[key];
                }
            }
        } }
        return copy;
    }
    // array
    const copy = base.slice() as any as A & B;
    for (const index in mixin) { if (mixin.hasOwnProperty(index)) {
        if (mixin[index] === undefined) {
            delete copy[index];
        } else {
            copy[index] = index < base.length
                ? extend((base as any)[index], mixin[index])
                : mixin[index];
        }
    } }
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

const d = (p: string, n: number): string => (p + Math.floor(n)).slice(-2);
export function timeI2S(seconds: number): string {
    return [
        d('', seconds / 3600),
        d('0', (seconds / 60) % 60),
        d('0', seconds % 60),
    ].join(':');
}

export function map<T, S>(
    item: Record<string, T>,
    fn: (i: T) => S,
): Record<string, S> {
    const copy: Record<string, S> = {};
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            copy[key] = fn(item[key]);
        }
    }
    return copy;
}

interface ICompose {
    <A, B, C>(f2: (b: B) => C, f1: (a: A) => B): (a: A) => C;
    <A, B, C, D>(f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => D;
}
export const compose: ICompose = (...a: ((arg: any) => any)[]) => (n: any): any => a.reduceRight((v, f) => f(v), n);

const tocp = (c: string) => 56806 - 97 + c.charCodeAt(0);
export const flag = (iso: string) =>
    String.fromCharCode(55356, tocp(iso[0]), 55356, tocp(iso[1]));

interface IZipWith {
    <A, B, C>(fn: (a: A, b: B) => C, a: A[], b: B[]): C[];
    <A, B, C, D>(fn: (a: A, b: B, c: C) => D, a: A[], b: B[], c: C[]): D[];
}

export const zipWith: IZipWith = (fn: any, ...args: any[][]) => {
    const n = Math.min(...args.map(e => e.length));
    const out = [];
    for (let i = 0; i < n; i++) {
        out.push(fn(...args.map(e => e[i])));
    }
    return out;
};
