import { res, HeroStats, HeroCombatStats, IHero } from '../types';

const sum = (a: number, b: number) => a + b;

export default abstract class Hero<S extends {}, K extends string=string> implements IHero<S, K> {
    protected skills: {[P: string]: number}
    private totalPoints: number;
    private pointsPerLevel: number;
    private maxLevel: number;
    constructor(private skillKeys: K[]) {
        this.skillKeys = skillKeys;
        this.skills = {};
        this.pointsPerLevel = skillKeys.length;
        this.maxLevel = 100;
        skillKeys.forEach(skill => { this.skills[skill] = 0; });
        this.totalPoints = 0;
    }
    public getNeededExp(): number {
        return this.levelExp(this.getNeededLvl());;
    }
    public getNeededLvl(): number {
        return Math.max(0, Math.ceil(this.totalPoints / this.pointsPerLevel - 1));
    }
    public getSkills(): K[] {
        return this.skillKeys;
    }
    public getStats(): HeroStats & S {
        return Object.assign(
            {
                c: this.getCost(),
                t: this.getTime()    
            },
            this.getCombat(),
            this.getMisc(),
        );
    }
    public setSkill(skill: K, level: number) {
        if (!(skill in this.skills)) {
            throw new RangeError(`Unsupported skill: ${skill}`);
        }
        if (isNaN(level)) {
            throw new TypeError(`invalid skill value: ${skill}=${level}`);
        }
        if (level < 0 || level > this.maxLevel) {
            throw new RangeError(`skill is out of range: ${skill}=${level}`);
        }
        this.getStats();
        this.skills[skill] = level;
        this.totalPoints = this.skillKeys.map(skill => this.skills[skill]).reduce(sum, 0);
    }
    protected levelExp(level: number) {
        return 50 * level * (level + 1);
    }
    public abstract getCombat(): HeroCombatStats
    public abstract getMisc(): S
    public abstract getCost(): res
    public abstract getTime(): number
}
