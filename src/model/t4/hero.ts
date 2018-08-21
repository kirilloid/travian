import { roundP, limit } from '../../utils';

import { res, IHero } from '../types';

import Hero from '../base/hero';
import ID from '../base/tribes';

const limitLvl = limit(1, 24);

function resCost(this: Hero<string>, res: number) {
    const lvl = this.getNeededLvl();
    const num = res * (1 + lvl / 24) * (1 + lvl);
    if (lvl >= 10) return roundP(100)(num);
    if (lvl >= 5) return roundP(50)(num);
    return roundP(10)(num);
}

export const tribeCosts: res[] = [
    [130, 115, 180, 75],
    [180, 130, 115, 75],
    [115, 180, 130, 75]
];

export type H4K = 'strength' | 'offBonus' | 'defBonus' | 'resources';
export type H4S = { ab: number, db: number, res: number };

export default class Hero4 extends Hero<H4S, H4K> {
    private mul: number;
    protected res: number;
    protected spd_i: number;
    protected spd_c: number;
    protected tribeCosts: res[];
    constructor(protected tribe: number) {
        super(['strength', 'offBonus', 'defBonus', 'resources']);
        this.spd_i = 7;
        this.spd_c = 0;
        this.tribeCosts = tribeCosts;
        if (tribe === ID.GAULS) this.spd_c = 5;
        this.mul = 80;
        if (tribe === ID.ROMANS) this.mul = 100;
        this.res = 1;
    }
    levelExp(level: number) {
        return super.levelExp(level) / 2;
    }
    protected getStrength() {
        return this.skills.strength * this.mul + 100;
    }
    getCombat() {
        const str = this.getStrength();
        return { a: str, di: str, dc: str };
    }
    getMisc(): H4S {
        const { offBonus, defBonus, resources } = this.skills;
        return {
            ab: offBonus * 0.25,
            db: defBonus * 0.25,
            res: resources * 6,
        };
    }
    getCost(): res {
        return this.tribeCosts[this.tribe].map(resCost, this) as res;
    }
    getTime() {
        return limitLvl(this.getNeededLvl()) * 3600;
    }
}