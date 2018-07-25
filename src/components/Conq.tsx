import * as React from 'react';
import update from 'react-addons-update';

import { Model, isAdmin } from '../model/types';
import { Lang } from '../lang';

import { roundP, limit, compose } from '../utils';
import { numericInt, range } from '../utils/probability';

type OffSide = {
    id: number
    pop: number
    tribe: number
    admins: number
    party: boolean
    brew: boolean
}

type DefSide = {
    pop: number
    party: boolean
}

const popMalus = compose(roundP(1e-3), limit(0.667, 1));

function timesToConq(units: [number, number][], { def, off }: ConqState) {
    const ranges: range[] = [];
    let totalMin = 0;
    let totalMax = 0;
    const steps = off.map(({ pop, brew, party, tribe, admins }) => {
        const malus = popMalus((def.pop / pop) ** 0.2)
                    * (brew ? 0.5 : 1);
        const patty = (party ? 5 : 0)
                    - (def.party ? 5 : 0);
        let [min, max] = units[tribe]
            .map(value => (value + patty) * malus * admins);
        ranges.push({ min, max });
        totalMin += min;
        totalMax += max;
        return numericInt(ranges);
    });
    return {
        steps,
        total(loyalty: number): string {
            const min = Math.ceil(loyalty / totalMax);
            const max = Math.ceil(loyalty / totalMin);
            return (min === max) ? `${max}` : `${min}–${max}`;
        }
    }
}

function formatPercent(f: (v: number) => number, loyalty: number) {
    const number = f(loyalty);
    if (f(loyalty + 1) === 1) return "100%";
    if (f(loyalty - 1) === 1) return "\u{2248}100%";
    return (number * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
}

type ConqProps = {
    model: Model
    lang: Lang
}
type ConqState = {
    loyalty: number
    def: DefSide
    off: OffSide[]
}
export default class Conq extends React.Component<ConqProps, ConqState> {
    private aid: number;
    private lastOff: OffSide
    constructor(props: ConqProps) {
        super(props);
        this.aid = 0;
        this.lastOff = {
            id: this.aid++,
            pop: 3000,
            tribe: 0,
            admins: 1,
            party: false,
            brew: false,
        };
        this.state = {
            loyalty: 100,
            def: {
                pop: 1000,
                party: false,
            },
            off: [this.lastOff]
        };
    }
    setLoyalty(value: number) {
        this.setState(update(
            this.state,
            { loyalty: { $set: value } }
        ));
    }
    setOffField(index: number, field: 'pop' | 'tribe' | 'admins', value: number) {
        this.setState(update(
            this.state,
            { off: { [index]: { [field]: { $set: value } } } }));
        if (index === this.state.off.length - 1) {
            this.lastOff[field] = value;
        }
    }
    setDefPop(value: number) {
        this.setState(update(
            this.state,
            { def: { pop: { $set: value } } }));
    }
    addOff() {
        this.lastOff = update(this.lastOff, { id: { $set: this.aid++ } })
        this.setState(update(
            this.state, 
            { off: { $push: [this.lastOff] } as any }
        ));        
    }
    removeOff(i: number) {
        this.setState(update(
            this.state, 
            { off: { $splice: [[i, 1]] } }
        ));        
    }
    render() {
        const { model, lang } = this.props;
        const admins = model.units
            .map(raceUnits => raceUnits.find(isAdmin));
        const nums = admins.map(a => a ? a.l : [0, 0]) as [number, number][];
        const conqStats = timesToConq(nums, this.state);
        return (<div>
            <label htmlFor="def_pop">{lang('terms.population')}</label>
            <input type="number" id="def_pop"
                min="1" max="99999" step="100" value={this.state.def.pop}
                onChange={event => this.setDefPop(+event.target.value)} />
            <label htmlFor="loyalty">{lang('terms.loyalty')}</label>
            <input type="range" id="loyalty"
                min="0" max="200" step="1" value={this.state.loyalty}
                onChange={event => this.setLoyalty(+event.target.value)} />
            <output>{this.state.loyalty}</output>
            <br />
            {lang('conq_chance')}
            {this.state.off.map((attacker, i) => <div key={attacker.id}>
                <button onClick={() => this.removeOff(i)}>–</button>
                <label htmlFor={`off_pop_${i}`}>
                    {lang('terms.population')}
                </label>
                <input type="number"
                    id={`off_pop_${i}`}
                    min="1" max="99999" step="100" value={attacker.pop}
                    onChange={event => this.setOffField(i, 'pop', +event.target.value)} />
                <input type="number" min="1" max="3"
                    value={attacker.admins}
                    onChange={event => this.setOffField(i, 'admins', +event.target.value)} />
                &times;
                <select value={attacker.tribe}
                    onChange={event => this.setOffField(i, 'tribe', +event.target.value)}>
                    {admins.map((unit, index) => unit
                        ? <option value={index} key={index}>
                            {lang(`objects.troops.t_${index}_8`)}
                            </option>
                        : null)}
                </select>
                |
                <span>{formatPercent(conqStats.steps[i], this.state.loyalty)}</span>
            </div>)}
            <button onClick={() => this.addOff()}>+</button>
            <span dangerouslySetInnerHTML={{
                __html: lang('conq_times', [conqStats.total(this.state.loyalty)])}} />
        </div>);
    }
}