import { sum } from '../../utils';
import { res } from '../types';
import CombatPoints from './combat/points';

export default abstract class Hero {
    protected skills: { [P: string]: number };
    private totalPoints: number;
    private pointsPerLevel: number;
    private maxLevel: number;
    constructor(private skillKeys: string[]) {
        this.skillKeys = skillKeys;
        this.skills = {};
        this.pointsPerLevel = skillKeys.length;
        this.maxLevel = 100;
        skillKeys.forEach(skill => { this.skills[skill] = 0; });
        this.totalPoints = 0;
    }
    public getNeededExp(): number {
        return this.levelExp(this.getNeededLvl());
    }
    public getNeededLvl(): number {
        return Math.max(0, Math.ceil(this.totalPoints / this.pointsPerLevel - 1));
    }
    public getSkills(): string[] {
        return this.skillKeys;
    }
    public setSkill(skill: string, level: number) {
        if (!(skill in this.skills)) {
            throw new RangeError(`Unsupported skill: ${skill}`);
        }
        if (isNaN(level)) {
            throw new TypeError(`invalid skill value: ${skill}=${level}`);
        }
        if (level < 0 || level > this.maxLevel) {
            throw new RangeError(`skill is out of range: ${skill}=${level}`);
        }
        this.skills[skill] = level;
        this.totalPoints = sum(this.skillKeys.map(skill => this.skills[skill]));
    }
    public abstract getSpeed(): number;
    public abstract getOff(): CombatPoints;
    public abstract getDef(): CombatPoints;
    public getOffBonus() {
        return this.skills.offBonus * 0.002;
    }
    public getDefBonus() {
        return this.skills.defBonus * 0.002;
    }
    public abstract getCost(): res;
    public abstract getTime(): number;
    protected levelExp(level: number) {
        return 50 * level * (level + 1);
    }
}
