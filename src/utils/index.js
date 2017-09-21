export function extend(base, mixin) {
    if (typeof base !== 'object') return mixin;
    if (!Array.isArray(base)) {
        var copy = {};
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

export function round5(n) {
    return 5 * Math.round(n / 5);
}