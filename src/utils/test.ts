import tape from 'tape';

export function almostEqual(this: tape.Test, a: number, b: number, msg: string) {
    if (Math.abs(a - b) / Math.min(a, b) <= Number.EPSILON) {
        this.ok(true, msg);
    } else {
        this.equal(a, b, msg);
    }
}
