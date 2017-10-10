export function extend(base, mixin) {
    if (typeof mixin === 'function'
    &&  typeof base !== 'function') {
        return mixin(base);
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

const cmp = (a, b) => (a > b) - (a < b);

export function sortBy(arr, fn) {
    return arr.sort((a, b) => cmp(fn(a), fn(b)));
}

export function resSum(res) {
    return res[0] + res[1] + res[2] + res[3];
}