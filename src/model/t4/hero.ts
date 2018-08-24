import { roundP, limit, sum } from '../../utils';

import { res } from '../types';
import { ItemEffect } from './items';

import Hero from '../base/hero';
import ID from '../base/tribes';
import CombatPoints from '../base/combat/points';

const limitLvl = limit(1, 24);

function resCost(this: Hero4, res: number) {
    const lvl = this.getNeededLvl();
    const num = res * (1 + lvl / 24) * (1 + lvl);
    if (lvl >= 10) { return roundP(100)(num); }
    if (lvl >= 5) { return roundP(50)(num); }
    return roundP(10)(num);
}

export const tribeCosts: res[] = [
    [130, 115, 180, 75],
    [180, 130, 115, 75],
    [115, 180, 130, 75],
];

export default class Hero4 extends Hero {
    protected res: number;
    protected speedOnFoot: number;
    protected speedMounted: number;
    protected tribeCosts: res[];
    protected mount: number;
    private mul: number;
    constructor(
        protected tribe: number,
        protected items: ItemEffect[] = [],
    ) {
        super(['strength', 'offBonus', 'defBonus', 'resources']);
        this.speedOnFoot = 7;
        this.speedMounted = 0;
        this.tribeCosts = tribeCosts;
        if (tribe === ID.GAULS) { this.speedMounted += 5; }
        this.mul = 80;
        this.mul = tribe === ID.ROMANS ? 100 : 80;
        this.res = 1;
        this.mount = 0;
    }
    public setMount(mounted: number): void {
        this.mount = mounted;
    }
    public getSpeed(): number {
        return this.mount
            ? this.speedMounted + this.mount
            : this.speedOnFoot;
    }
    public getItemsTotal(name: keyof ItemEffect): number {
        let total = 0;
        for (const item of this.items) {
            const value = item[name];
            if (typeof value === 'number') {
                total += value;
            }
        }
        return total;
    }
    public getOff(): CombatPoints {
        const selfStr = this.getStrength();
        const itemStr = this.getItemsTotal('str');
        const str = selfStr + itemStr;
        return CombatPoints.off(str, !this.mount);
    }
    public getDef(): CombatPoints {
        const selfStr = this.getStrength();
        const itemStr = this.getItemsTotal('str');
        const str = selfStr + itemStr;
        return new CombatPoints(str, str);
    }
    public getOffBonus(): number {
        return super.getOffBonus() + this.getItemsTotal('nat') / 100;
    }
    public getResources(): number {
        return this.skills.resources * 6;
    }
    public getCost(): res {
        return this.tribeCosts[this.tribe].map(resCost, this) as res;
    }
    public getTime(): number {
        return limitLvl(this.getNeededLvl()) * 3600;
    }
    protected getStrength(): number {
        return this.skills.strength * this.mul + 100;
    }
    protected levelExp(level: number): number {
        return super.levelExp(level) / 2;
    }
}
