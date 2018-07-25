export interface VersionInfo {
    original: string
    full: string
    base: string
    variation: string
    speed: number
}

export interface ServerGroup {
    title: string
    servers: Server[]
}

export interface Server {
    title: string
    version: string
}

export interface Model<H=IHero> {
    units: Unit[][]
    buildings: any[]
    culture: any
    combat: any
    // Hero?: H
}

export type res = [number, number, number, number];

export type HeroCombatStats = {
    a: number
    di: number
    dc: number
}
export type HeroStats = HeroCombatStats & {
    c: res
    t: number
}
export interface IHero<S={}, K='string'> {
    getNeededLvl(): number
    getNeededExp(): number
    getSkills(): K[]
    getStats(): HeroStats & S
    setSkill(skill: K, level: number): void
    getCombat(): HeroCombatStats
    getMisc(): S
    getCost(): res
    getTime(): number
}

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
}
export type UnitRegular = BaseUnit & { k: 'u' };
export type UnitSpy = BaseUnit & { k: 's', s: number, ds: number };
export type UnitRam = BaseUnit & { k: 'r' };
export type UnitCat = BaseUnit & { k: 'c' };
export type UnitAdmin = BaseUnit & { k: 'a', l: [number, number] };
export type UnitSettler = BaseUnit & { k: 't' };
export type Unit = UnitRegular | UnitSpy | UnitRam | UnitCat | UnitAdmin | UnitSettler

export function isAdmin(u: Unit): u is UnitAdmin { return u.k === 'a'; }
export function isCatapult(u: Unit): u is UnitAdmin { return u.k === 'c'; }
export function isRam(u: Unit): u is UnitAdmin { return u.k === 'r'; }
