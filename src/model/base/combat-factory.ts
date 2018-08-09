import { extend } from '../../utils';
import { Building, SLOT } from './buildings';
import { Place, Def, Off, Unit } from '../types';

const ZEROES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export function place(obj: Partial<Place>): Place {
    return extend({
        tribe: 0,
        pop: 100,
        durBonus: 1,
        wall: {
            level: 0,
            durability: 1,
            bonus: (lvl: number) => ({ defBonus: 0 })
        },
        def: 0,
        party: false,
    }, obj);
}

export function def(obj: Partial<Def>) {
    return extend({
        kind: 'def',
        tribe: 0,
        numbers: ZEROES,
        upgrades: ZEROES,
    }, obj);
}

export function off(obj: Partial<Off>) {
    return extend({
        kind: 'off',
        tribe: 0,
        pop: 100,
        numbers: ZEROES,
        upgrades: ZEROES,
        type: 'attack',
        targets: [],
        // hero: Hero
        // metallurgy: number
        party: false,
        brew: 0
    }, obj);
}

type PlaceWoWall = {
    tribe: number
    pop: number
    durBonus: number
    def: number
    party: boolean
    wall: number
}

export function factory(
    { units, buildings }: { units: Unit[][], buildings: Building[] }
) {
    const walls = {};
    buildings
        .filter(b => b.s === SLOT.WALL)
        .forEach(b => { walls[b.r.r] = b; });
    return {
        off: obj => {
            const result = off(obj);
            return extend(result, { units: units[result.tribe] });
        },
        def: obj => {
            const result = def(obj);
            return extend(result, { units: units[result.tribe] });
        },
        place: (obj: Partial<PlaceWoWall>): Place => {
            const { wall, ...rest } = obj;
            const result = place(rest);
            const building = walls[result.tribe];
            result.wall = {
                level: wall || 0,
                bonus: building.f,
                durability: building.d
            };
            return result;
        }
    }
}
