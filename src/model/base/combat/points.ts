export default class CombatPoints {
    public static zero() {
        return new CombatPoints(0, 0);
    }
    public static off(value: number, isInfantry: boolean): CombatPoints {
        return isInfantry
            ? new CombatPoints(value, 0)
            : new CombatPoints(0, value);
    }
    public static def(value: number): CombatPoints {
        return new CombatPoints(value, value);
    }
    public static add(a: CombatPoints, b: CombatPoints): CombatPoints {
        return a.add(b);
    }
    public static sum(ps: CombatPoints[]): CombatPoints {
        const total = CombatPoints.zero();
        ps.forEach(cp => {
            total.i += cp.i;
            total.c += cp.c;
        });
        return total;
    }
    constructor(public i: number, public c: number) {}
    public add(that: CombatPoints) {
        return new CombatPoints(this.i + that.i, this.c + that.c);
    }
    public mul(m: number) {
        return new CombatPoints(this.i * m, this.c * m);
    }
    public mask(mask: CombatPoints) {
        return new CombatPoints(mask.i ? this.i : 0, mask.c ? this.c : 0);
    }
}
