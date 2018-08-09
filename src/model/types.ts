import { Building } from './base/buildings';

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
    buildings: Building[]
    culture: any
    combat: any
    // Hero?: H
}

export type res = [number, number, number, number];

// hero
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
}
export type UnitRegular = BaseUnit & { k: 'u' };
export type UnitSpy = BaseUnit & { k: 's', s: number, ds: number };
export type UnitRam = BaseUnit & { k: 'r' };
export type UnitCat = BaseUnit & { k: 'c' };
export type UnitAdmin = BaseUnit & { k: 'a', l: [number, number] };
export type UnitSettler = BaseUnit & { k: 't' };
export type Unit = UnitRegular | UnitSpy | UnitRam | UnitCat | UnitAdmin | UnitSettler

export function isAdmin(u: Unit): u is UnitAdmin { return u.k === 'a'; }
export function isCatapult(u: Unit): u is UnitCat { return u.k === 'c'; }
export function isRam(u: Unit): u is UnitRam { return u.k === 'r'; }
export function isSpy(u: Unit): u is UnitSpy { return u.k === 's'; }

// combat
export type CombatPoints = {
    i: number
    c: number
}

export type Off = {
    kind: 'off'
    pop: number
    units: Unit[]
    numbers: number[]
    upgrades: number[]
    type: 'attack' | 'raid'
    targets: number[]
    // hero: Hero
    // metallurgy: number
    party: boolean
    brew: number
}

export type Def = {
    kind: 'def'
    units: Unit[]
    numbers: number[]
    upgrades: number[]

    // hero: Hero
    // metallurgy: number
}

export type Side = Off | Def

// all fields should be are pre-computed
export type Place = {
    tribe: number
    pop: number
    durBonus: number
    wall: number
    def: number
    party: boolean
    wallBonus: (lvl: number) => { defBonus: number }
    // traps: number
}

export type CombatResult = {
    offLosses: number
    defLosses: number,
    buildings: number[]
    wall: number
}

type ReportSide = {
    units: number[]
    losses: number[]
}

type ReportInfo = {
    demolished: [number, number][]
    noneReturn: boolean
    conquered: boolean
}

type ReportStats = {

}

export type Report = {
    off: ReportSide
    def: { [key: number]: ReportSide }
    info: ReportInfo
    stats: ReportStats
}