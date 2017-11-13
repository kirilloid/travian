function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

export const model = (pairs) => {
    let total = { min: 0, max: 0, mul: 1 };
    pairs.forEach(({ min, max }) => {
        total.min += min;
        total.max += max;
        total.mul *= max - min;
    });
    let variants = pairs.reduce((variants, { min, max }) => {
        let nextVariants = [];
        variants.forEach(({ sum, sign }) => {
            nextVariants.push(
                { sum: sum + min, sign:  sign },
                { sum: sum + max, sign: -sign }
            );
        });
        nextVariants.sort((a, b) => a.sum - b.sum);
        let newVariants = [];
        let last = { sum: -1, sign: 1 };
        for (const variant of nextVariants) {
            if (variant.sum === last.sum) {
                last.sign += variant.sign;
            } else {
                newVariants.push(last = variant);
            }
        }
        return newVariants;
    }, [{ sum: 0, sign: 1 }]);
    const avg = (total.max + total.min) / 2;
    const calc = (value) => {
        if (value <= total.min) return 1;
        let sum = 0;
        for (const item of variants) {
            if (value <= item.sum) break;
            sum += (value - item.sum) ** pairs.length * item.sign;
        }
        return 1 - sum / total.mul / factorial(pairs.length);
    }
    return value => (value < avg)
        ? calc(value)
        : 1 - calc(2 * avg - value);
};


/**
 * multiplies one range (long int) by 11...11
 * @param {number[]} current
 * @param {number} ones
 * @returns {number[]}
 */
export function multiplyRangeByOnes(current, ones) {
    let range = [];
    let slidingWindowSum = 0;
    const fractionalPart = ones % 1;
    ones = Math.floor(ones);
    if (current.length >= ones) {
        for (let i = 0; i < ones; i++) {
            slidingWindowSum += current[i]
            range.push(slidingWindowSum);
        }
        for (let i = ones; i < current.length; i++) {
            slidingWindowSum += current[i];
            slidingWindowSum -= current[i - ones];
            range.push(slidingWindowSum);
        }
        for (let i = 0; i < ones; i++) {
            slidingWindowSum -= current[i + current.length - ones];
            range.push(slidingWindowSum);
        }
    } else {
        for (let i = 0; i < current.length; i++) {
            slidingWindowSum += current[i]
            range.push(slidingWindowSum);
        }
        for (let i = current.length; i < ones; i++) {
            range.push(slidingWindowSum);
        }
        for (let i = 0; i < current.length; i++) {
            slidingWindowSum -= current[i];
            range.push(slidingWindowSum);
        }
    }
    if (fractionalPart > 0) {
        current.forEach((value, index) => {
            range[index + ones] += value * fractionalPart;
        });
    } else {
        range.pop();
    }
    return range;
}

function linearApprox(values, x) {
    const loPoint = Math.floor(x);
    const hiPoint = Math.ceil(x);
    if (hiPoint === loPoint) return values.get(x);
    return values.get(loPoint) * (hiPoint - x)
        +  values.get(hiPoint) * (x - loPoint);
}

function cubicApprox(values, x) {
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    if (x1 === x0) return values.get(x);
    const f0 = values.get(x0 - 1);
    const f1 = values.get(x0) - f0;
    const f2 = values.get(x1) - f0;
    const f3 = values.get(x1 + 1) - f0;
    const a = ( f3 - 3*f2 + 3*f1) / 6;
    const b = (-f3 + 4*f2 - 5*f1) / 2;
    const c = (2*f3 -9*f2 +18*f1) / 6;
    const d = f0;
    x -= x0 - 1;
    return ((a*x + b)*x + c)*x + d;
}

export const numericInt = (precision = 2) => (pairs) => {
    const SCALE = 10 ** precision;
    let total = { min: 0, max: 0, mul: 1 };
    let range = [1];
    pairs.forEach(({ min, max }) => {
        const rDiff = Math.round((max - min) * SCALE);
        total.min += min;
        total.max += rDiff / SCALE + min;
        total.mul *= rDiff;
        range = multiplyRangeByOnes(range, rDiff);
    });
    var sum = 0;
    for (let i = range.length - 1; i >= 0; i--) {
        sum += range[i];
        range[i] = sum / total.mul;
    }
    return value => {
        value -= (pairs.length - 1) / (2 * SCALE);
        return cubicApprox({
            get(x) {
                if (x < 0) return 1;
                if (x >= range.length) return 0;
                return range[x];
            }
        }, (value - total.min) * SCALE);
    };
};
