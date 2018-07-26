import * as React from 'react';
import { Building } from '../model/base/buildings';
import { Lang } from '../lang';
import { Build as BuildIcon } from './Icon';
import RadioGroup from '../widgets/RadioGroup';
import { extend, sortBy, resSum, map } from '../utils';

type T1 = { building: Building, level: number }
type T2 = { [P: string]: T1 }
type T3 = { def: number, cost: number, state: T2 }

function totalDef(state: T2): number {
    const total = {
        def: 10,
        defBonus: 1
    };
    for (let key in state) {
        const { building, level } = state[key];
        const { def = 0, defBonus = 0 } = building.f(level);
        total.def += def;
        total.defBonus += defBonus;
    }
    return Math.round(total.def * total.defBonus);
}

function incBuildLevel({ state, cost }: T3, type: string): T3 | null {
    const { building, level } = state[type];
    const nextLevel = level + 1;
    const nextState = extend(state, { [type]: { level: nextLevel } });
    if (nextLevel > building.maxLevel) return null;
    return {
        state: nextState,
        cost: cost + resSum(building.cost(nextLevel)),
        def: totalDef(nextState)
    };
}

function getNext(current: T3): T3 {
    const { cost, def } = current;
    const nextStates: T3[] = [];
    for (const key in current.state) {
        const next = incBuildLevel(current, key);
        if (next !== null) {
            nextStates.push(next);
        }
    }
    sortBy(nextStates, next => (next.def - def) / (next.cost - cost));
    return nextStates.slice(-1)[0];
}

function getInitial(buildings: {[P: string]: Building}): T3 {
    const state = map(buildings, building => ({ building, level: 0 }));
    return { state, cost: 0, def: totalDef(state) };
}

function getOrder(buildings: {[P: string]: Building}): T3[] {
    let current = getInitial(buildings);
    const order = [current];
    while (current = getNext(current)) {
        order.push(current);
    }
    return order;
}

const propLevels = (state: T2) =>
    Object.keys(state)
        .map(key => state[key].level)
        .join('_');

export default class Def extends React.Component<
    { buildings: Building[], lang: Lang },
    {}
> {
    render() {
        const walls: Building[] = [];
        const bases: Building[] = [];
        const ditch: Building[] = [];
        const { buildings, lang } = this.props;
        buildings.forEach(building => {
            const bonus = building.f(0);
            if (typeof bonus !== 'object') return;
            if ('defBonus' in bonus) {
                if (building.r && building.r.r) {
                    walls.push(building);
                } else if (building.s === 41) {
                    ditch.push(building);
                }
            } else if ('def' in bonus) {
                bases.push(building);
            }
        });
        return <DefInner buildings={buildings} walls={walls} bases={bases} ditch={ditch} lang={lang} />
    }
}

type DefInnerProps = {
    buildings: Building[],
    walls: Building[],
    bases: Building[],
    ditch: Building[],
    lang: Lang
}

class DefInner extends React.Component<DefInnerProps, {
    base: number,
    wall: number,
    ditch: number
}> {
    constructor(props: DefInnerProps) {
        super(props);
        this.state = {
            base: props.bases[0].id,
            wall: props.walls[0].id,
            ditch: props.ditch.length
                ? props.ditch[0].id
                : 0
        };
    }
    setStateKey(key: string, value: any) {
        this.setState(extend(this.state, { [key]: value }));
    }
    render() {
        const { buildings, walls, bases } = this.props;
        return <div>
            <RadioGroup
                key="base"
                value={this.state.base}
                onChange={value => this.setStateKey('base', +value)}
                buttons={bases.map(building => ({
                    content: <BuildIcon id={building.id} />,
                    value: building.id
                }))}
            />
            <RadioGroup
                key="wall"
                value={this.state.wall}
                onChange={value => this.setStateKey('wall', +value)}
                buttons={walls.map(building => ({
                    content: <BuildIcon id={building.id} />,
                    value: building.id
                }))}
            />
            {getOrder(map(this.state, id => buildings[id]))
                .map(({ state }) => <div key={propLevels(state)}>
                    {Object.keys(state).sort().map(key => state[key].building.id ? <span key={key}>
                        <BuildIcon id={state[key].building.id} />
                        {state[key].level}
                    </span> : null)}
                </div>)}
        </div>;
    }
}