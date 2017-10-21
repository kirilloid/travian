export function extend(base, mixin) {
    if (typeof mixin === 'function') {
        switch (typeof base) {
        case 'undefined':
        case 'function':
            return mixin;
        default:
            return mixin(base);
        }
    }
    if (typeof base !== 'object') {
        return mixin;
    }
    if (!Array.isArray(base)) {
        var copy = Object.create(Object.getPrototypeOf(base));
        for (let key in base) {
            if (!(key in mixin)
            ||  mixin[key] !== undefined) {
                copy[key] = base[key];
            }
        }
        for (let key in mixin) {
            if (mixin[key] !== undefined) {
                copy[key] = extend(base[key], mixin[key]);
            }
        }
        return copy;
    }
    var copy = base.slice();
    for (let index in mixin) {
        if (mixin[index] === undefined) {
            delete copy[index];
        } else {
            copy[index] = index < base.length
                ? extend(copy[index], mixin[index])
                : mixin[index];
        }
    }
    return copy;
}

export const roundP = precision => number =>
    precision * Math.round(number / precision);

export const limit = (a, b) => (n) => Math.min(b, Math.max(a, n));

const cmp = (a, b) => (a > b) - (a < b);

export function sortBy(arr, fn) {
    return arr.sort((a, b) => cmp(fn(a), fn(b)));
}

export function resSum(res) {
    return res[0] + res[1] + res[2] + res[3];
}

const d = (p, n) => (p + ~~n).slice(-2);
export function timeI2S(seconds) {
    return [
        d('', seconds / 3600),
        d('0', (seconds / 60) % 60),
        d('0', seconds % 60)
    ].join(':');
}

export function map(item, fn) {
    const copy = {};
    Object.keys(item)
        .forEach(key => { copy[key] = fn(item[key]); });
    return copy;
}

export const compose = (...a) => n => a.reduceRight((v, f) => f(v), n);