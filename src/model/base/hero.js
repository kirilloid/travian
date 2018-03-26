const sum = (a, b) => a + b;

export default class Hero {
    constructor(skillKeys) {
        this.skillKeys = skillKeys;
        this.skills = {};
        this.pointsPerLevel = skillKeys.length;
        this.maxLevel = 100;
        skillKeys.forEach(skill => { this.skills[skill] = 0; });
        this.updateExp();
    }
    levelExp(level) {
        return 50 * level * (level + 1);
    }
    updateExp() {
        const totalPoints = Object.values(this.skills).reduce(sum, 0);
        this.neededLvl = Math.max(0, Math.ceil(totalPoints / this.pointsPerLevel - 1));
        this.neededExp = this.levelExp(this.neededLvl);
    }
    getSkills() {
        return this.skillKeys;
    }
    getCombat() { return { a: 0, di: 0, ci: 0 }; }
    getMisc() { return {}; }
    getCost() { return [0, 0, 0, 0]; }
    getTime() { return 0; }
    setSkill(skill, level) {
        if (!(skill in this.skills)) {
            throw new RangeError(`Unsupported skill: ${skill}`);
        }
        if (typeof level !== 'number' || isNaN(level)) {
            throw new TypeError(`invalid skill value: ${skill}=${level}`);
        }
        if (level < 0 || level > 100) {
            throw new RangeError(`skill is out of range: ${skill}=${level}`);
        }
        this.skills[skill] = level;
        this.updateExp();
        this.stats = {
            ...this.getCombat(),
            ...this.getMisc(),
            c: this.getCost(),
            t: this.getTime()
        };
    }
}
