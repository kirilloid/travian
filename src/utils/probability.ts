/**
 * This module contains probability distribution calculators (there are several)
 * Every calculator accepts a set of ranges and then returns a function calculating distribution
 * corresponding to distribution of sum of independantly and uniformly distributed variables
 *
 * There are two approaches:
 * - analytical
 * - numeric modelling
 */

export type range = { min: number, max: number };
type variant = { sum: number, sign: number };
type totalArray = (index: number) => number;

function factorial(n: number): number {
    return n ? n * factorial(n - 1) : 1;
}

/**
 * Calculator using precise analytical model, which is stupid inclusion-exclusion formula
 * could be improved with optimization, but the worst-case is still exponential
 * Nonetheless, it's good to test other ways since we can control inputs
 */
export const model = (ranges: range[]): totalArray => {
    const total = { min: 0, max: 0, volume: 1 };
    ranges.forEach(({ min, max }) => {
        total.min += min;
        total.max += max;
        total.volume *= max - min;
    });

    // we gradually build a set of inflection points, by adding dimensions
    // in general case we'd get a set of vertices of a hyperrectangle
    // but it's O(2^N) so we try to merge nodes with similar Manhattan distance from the origin
    // E.g. if every range is equal it'd be a hypercube and we'd need to calculate only N nodes
    // with binomal coefficients instead of 2^N vertices
    const variants: variant[] = ranges.reduce((variants, { min, max }) => {
        const nextVariants: variant[] = [];
        // kind of flatMap to add a dimension
        variants.forEach(({ sum, sign }) => {
            nextVariants.push(
                { sum: sum + min, sign: +sign },
                { sum: sum + max, sign: -sign },
            );
        });
        // re-order and merge duplicates
        nextVariants.sort((a, b) => a.sum - b.sum);
        const newVariants = [];
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

    // auxiliary value
    const avg = (total.max + total.min) / 2;

    // almost final version of a calculating function
    const calc = (value: number): number => {
        if (value <= total.min) { return 1; }
        let sum = 0;
        for (const item of variants) {
            if (value <= item.sum) { break; }
            sum += (value - item.sum) ** ranges.length * item.sign;
        }
        return 1 - sum / total.volume / factorial(ranges.length);
    };

    // the distribution is symmetrical, but our calculation method is not
    // so calculating towards nearest "pole" require less operations and accumulates less error
    return (value: number): number => (value < avg)
        ? calc(value)
        : 1 - calc(2 * avg - value);
};

/**
 * utility function: multiplies a vector by 11...11 in <em>linear</em> time
 * works with "sub-pixel" precision
 */
export function multiplyRangeByOnes(current: number[], ones: number): number[] {
    const range: number[] = [];
    let slidingWindowSum = 0;
    const fractionalPart = ones % 1;
    ones = Math.floor(ones);
    if (current.length >= ones) {
        for (let i = 0; i < ones; i++) {
            slidingWindowSum += current[i];
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
        for (const c of current) {
            slidingWindowSum += c;
            range.push(slidingWindowSum);
        }
        for (let i = current.length; i < ones; i++) {
            range.push(slidingWindowSum);
        }
        for (const c of current) {
            slidingWindowSum -= c;
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

export function linearInterpolation(values: totalArray, x: number): number {
    const loPoint = Math.floor(x);
    const hiPoint = Math.ceil(x);
    if (hiPoint === loPoint) { return values(x); }
    return values(loPoint) * (hiPoint - x)
        +  values(hiPoint) * (x - loPoint);
}

export function cubicInterpolation(values: totalArray, x: number): number {
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    if (x1 === x0) { return values(x); }
    const f0 = values(x0 - 1);
    const f1 = values(x0) - f0;
    const f2 = values(x1) - f0;
    const f3 = values(x1 + 1) - f0;
    // I don't remember exactly where did I get these coefficients,
    // but I think it's Bézier curve interpolation
    const a = ( f3 - 3*f2 + 3*f1) / 6;
    const b = (-f3 + 4*f2 - 5*f1) / 2;
    const c = (2*f3 -9*f2 +18*f1) / 6;
    const d = f0;
    x -= x0 - 1;
    return ((a*x + b)*x + c)*x + d;
}

/**
 * transforms array into a total function with 1 on the left side and 0 on the right
 * @param {number[]} array
 * @returns {function(number): number}
 */
export function totalArray(array: number[]): totalArray {
    return index => {
        if (index < 0) { return 1; }
        if (index >= array.length) { return 0; }
        return array[index];
    };
}

/**
 * Distribution calculator based on numeric modelling approach
 * 'int' means it doesn't try to calculate ranges with "subpixel" precision
 * total running time is quadratic, but also depends on precision
 */
export const numericInt = (ranges: range[], precision = 2): totalArray => {
    const SCALE = 10 ** precision;

    // calculate aggregated values
    const total = { min: 0, max: 0, volume: 1 };
    ranges.forEach(({ min, max }) => {
        const rangeWidth = Math.round((max - min) * SCALE);
        total.min += min;
        // we use integer width of the pixel-aligned range
        total.max += rangeWidth / SCALE + min;
        total.volume *= rangeWidth;
    });
    const dist = ranges.reduce((dist, { min, max }) => {
        const rangeWidth = Math.round((max - min) * SCALE);
        return multiplyRangeByOnes(dist, rangeWidth);
    }, [1]);
    let sum = 0;
    // integrate distribution density, reverse and normalize it
    for (let i = dist.length - 1; i >= 0; i--) {
        sum += dist[i];
        dist[i] = sum / total.volume;
    }
    const totalDist = totalArray(dist);
    return value => {
        // adjusting exactly by (N-1)/2 pixels is empirical, but crucial for precision
        value -= (ranges.length - 1) / (2 * SCALE);
        return cubicInterpolation(totalDist, (value - total.min) * SCALE);
    };
};
