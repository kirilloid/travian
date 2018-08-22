import * as React from 'react';
import { Building } from '../model/base/buildings';
import { Lang } from '../lang';
import { Build as BuildIcon } from './Icon';
import RadioGroup from '../widgets/RadioGroup';
import { extend, sortBy, resSum, map } from '../utils';

type LBuilding = { building: Building, level: number };
type VState = { [P: string]: LBuilding };
type StateWithROI = { def: number, cost: number, state: VState };

function totalDef(state: VState): number {
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

function incBuildLevel({ state, cost }: StateWithROI, type: string): StateWithROI | null {
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

function getNext(current: StateWithROI): StateWithROI {
    const { cost, def } = current;
    const nextStates: StateWithROI[] = [];
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

function getInitial(buildings: {[P: string]: Building}): StateWithROI {
    const state = map(buildings, building => ({ building, level: 0 }));
    return { state, cost: 0, def: totalDef(state) };
}

function getOrder(buildings: {[P: string]: Building}): StateWithROI[] {
    let current = getInitial(buildings);
    const order = [current];
    // tslint:disable-next-line:no-conditional-assignment
    while (current = getNext(current)) {
        order.push(current);
    }
    return order;
}

const propLevels = (state: VState) =>
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

export default class DefInner extends React.Component<DefInnerProps, {
    base: number,
    wall: number,
    ditch: number,
}> {
    constructor(props: DefInnerProps) {
        super(props);
        this.state = {
            base: props.bases[0].id,
            wall: props.walls[0].id,
            ditch: props.ditch.length
                ? props.ditch[0].id
                : 0,
        };
    }
    public setStateKey(key: string, value: any) {
        this.setState(extend(this.state, { [key]: value }));
    }
    public render() {
        const { buildings, walls, bases } = this.props;
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
