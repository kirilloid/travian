export default class CombatPoints {
    constructor(public i: number, public c: number) {}
    static zero() {
        return new CombatPoints(0, 0);
    }
    static add(a: CombatPoints, b: CombatPoints): CombatPoints {
        return a.add(b);
    }
    static sum(ps: CombatPoints[]): CombatPoints {
        const total = CombatPoints.zero();
        ps.forEach(cp => {
            total.i += cp.i;
            total.c += cp.c;
        });
        return total;
    }
    add(that: CombatPoints) {
        return new CombatPoints(this.i + that.i, this.c + that.c);
    }
    mul(m: number) {
        return new CombatPoints(this.i * m, this.c * m);
    }
    mask(mask: CombatPoints) {
        return new CombatPoints(mask.i ? this.i : 0, mask.c ? this.c : 0);
    }
}
