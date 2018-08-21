import { Building } from './base/buildings';

export type VersionInfo = {
    original: string
    full: string
    base: string
    variation: string
    speed: number
};

export type ServerGroup = {
    title: string
    servers: Server[]
};

export type Server = {
    title: string
    version: string
};

export type Model<H=IHero> = {
    units: Unit[][]
    buildings: Building[]
    culture: (villages: number) => number
    combat: { combat(place: any, sides: any[]): CombatResult[] },
    // Hero?: H
};

export type res = [number, number, number, number];

// hero
export type HeroCombatStats = {
    a: number
    di: number
    dc: number
};
export type HeroStats = HeroCombatStats & {
    c: res
    t: number
};
export interface IHero<S=object, K='string'> {
    getNeededLvl(): number;
    getNeededExp(): number;
    getSkills(): K[];
    getStats(): HeroStats & S;
    setSkill(skill: K, level: number): void;
    getCombatStats(): HeroCombatStats;
    getOffBonus(): number;
    getDefBonus(): number;
    getMisc(): S;
    getCost(): res;
    getTime(): number;
}

// units
export type BaseUnit = {
    a: number
    di: number
    dc: number
    v: number
    c: res
    u: number
    t: number
    p: number
    i: number
    rt: number
};
export type UnitRegular = BaseUnit & { k: 'u' };
export type UnitSpy = BaseUnit & { k: 's', s: number, ds: number };
export type UnitRam = BaseUnit & { k: 'r' };
export type UnitCat = BaseUnit & { k: 'c' };
export type UnitAdmin = BaseUnit & { k: 'a', l: [number, number] };
export type UnitSettler = BaseUnit & { k: 't' };
export type Unit = UnitRegular | UnitSpy | UnitRam | UnitCat | UnitAdmin | UnitSettler;

export function isAdmin(u: Unit): u is UnitAdmin { return u.k === 'a'; }
export function isCatapult(u: Unit): u is UnitCat { return u.k === 'c'; }
export function isRam(u: Unit): u is UnitRam { return u.k === 'r'; }
export function isSpy(u: Unit): u is UnitSpy { return u.k === 's'; }

// combat
export type CombatResult = {
    offLosses: number
    defLosses: number
    buildings: number[]
    wall: number
};

type ReportSide = {
    units: number[]
    losses: number[]
};

type ReportInfo = {
    demolished: [number, number][]
    noneReturn: boolean
    conquered: boolean
};

type ReportStats = {

};

export type Report = {
    off: ReportSide
    def: { [key: number]: ReportSide }
    info: ReportInfo
    stats: ReportStats
};
