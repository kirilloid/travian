import * as React from 'react';
import { Building } from '../model/base/buildings';
import { Lang } from '../lang';
import { Build as BuildIcon } from './Icon';
import RadioGroup from '../widgets/RadioGroup';
import { extend, sortBy, resSum, map } from '../utils';

type BuildConfig = {[P: string]: Building};
type Build = { building: Building, level: number };
type Village = { [P: string]: Build };
type FullState = { def: number, cost: number, state: Village };

function totalDef(state: Village): number {
    const total = {
        def: 10,
        defBonus: 1,
    };
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            const { building, level } = state[key];
            const { def = 0, defBonus = 0 } = building.f(level);
            total.def += def;
            total.defBonus += defBonus;
        }
    }
    return Math.round(total.def * total.defBonus);
}

function incBuildLevel({ state, cost }: FullState, type: string): FullState | null {
    const { building, level } = state[type];
    const nextLevel = level + 1;
    const nextState = extend(state, { [type]: { level: nextLevel } });
    if (nextLevel > building.maxLevel) { return null; }
    return {
        state: nextState,
        cost: cost + resSum(building.cost(nextLevel)),
        def: totalDef(nextState),
    };
}

function getNext(current: FullState): FullState {
    const { cost, def } = current;
    const nextStates: FullState[] = [];
    for (const key in current.state) {
        if (current.state.hasOwnProperty(key)) {
            const next = incBuildLevel(current, key);
            if (next !== null) {
                nextStates.push(next);
            }
        }
    }
    sortBy(nextStates, next => (next.def - def) / (next.cost - cost));
    return nextStates.slice(-1)[0];
}

function getInitial(buildings: BuildConfig): FullState {
    const state = map(buildings, building => ({ building, level: 0 }));
    return { state, cost: 0, def: totalDef(state) };
}

function getOrder(buildings: BuildConfig): FullState[] {
    let current = getInitial(buildings);
    const order = [current];
    // tslint:disable-next-line:no-conditional-assignment
    while (current = getNext(current)) {
        order.push(current);
    }
    return order;
}

function diffKey(a: Village, b: Village): string {
    for (const key in a) {
        if (a[key] !== b[key]) { return key; }
    }
    return '';
}

function compactOrder(states: FullState[]): FullState[] {
    let [preLast, last] = states;
    const tail = states.slice(2);
    const out: FullState[] = [preLast, last];
    for (const current of tail) {
        if (diffKey(preLast.state, last.state) === diffKey(last.state, current.state)) {
            out.pop();
        }
        out.push(current);
        preLast = last;
        last = current;
    }
    return out;
}

const propLevels = (state: Village) =>
    Object.keys(state)
        .map(key => state[key].level)
        .join('_');

type DefInnerProps = {
    buildings: Building[],
    walls: Building[],
    bases: Building[],
    ditch: Building[],
    lang: Lang,
};

type DefInnerState = {
    base: number,
    wall: number,
};

type DefInnerStateWithDitch = DefInnerState & { ditch: number };

export default class DefInner extends React.Component<
    DefInnerProps,
    DefInnerState | DefInnerStateWithDitch
> {
    constructor(props: DefInnerProps) {
        super(props);
        this.state = props.ditch.length
            ? { base: props.bases[0].id,
                wall: props.walls[0].id,
                ditch: props.ditch[0].id }
            : { base: props.bases[0].id,
                wall: props.walls[0].id };
    }
    public setStateKey(key: string, value: any) {
        this.setState(extend(this.state, { [key]: value }));
    }
    public render() {
        const { buildings, walls, bases } = this.props;
        const initialState = map(this.state, (id: number) => buildings[id]);
        return <div>
            <RadioGroup
                key="base"
                value={this.state.base}
                onChange={value => this.setStateKey('base', +value)}
                buttons={bases.map(building => ({
                    content: <BuildIcon id={building.id} />,
                    value: building.id,
                }))}
            />
            <RadioGroup
                key="wall"
                value={this.state.wall}
                onChange={value => this.setStateKey('wall', +value)}
                buttons={walls.map(building => ({
                    content: <BuildIcon id={building.id} />,
                    value: building.id,
                }))}
            />
            {compactOrder(getOrder(initialState))
                .map(({ state }: FullState) => <div key={propLevels(state)}>
                    {Object.keys(state).sort().map(key => state[key].building.id ? <span key={key}>
                        <BuildIcon id={state[key].building.id} />
                        {state[key].level}
                    </span> : null)}
                </div>)}
        </div>;
    }
}
