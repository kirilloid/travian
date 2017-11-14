import React, { Component } from 'react';
import update from 'react-addons-update';

import { roundP, limit, compose } from '../utils';
import { numericInt } from '../utils/probability';

const popMalus = compose(roundP(1e-3), limit(0.667, 1));

function timesToConq({ units }, { loyalty, def, off }) {
    const pairs = [];
    let totalMin = 0;
    let totalMax = 0;
    const steps = off.map(attacker => {
        const malus = popMalus((def.pop / attacker.pop) ** 0.2)
                    * (attacker.brew ? 0.5 : 1);
        const party = (attacker.party - def.party) * 5;
        let [min, max] = units[attacker.tribe][8].l
            .map(value => (value + party) * malus * attacker.admins);
        pairs.push({ min, max });
        totalMin += min;
        totalMax += max;
        return numericInt(pairs);
    });
    return {
        steps,
        total(loyalty) {
            const min = Math.ceil(loyalty / totalMax);
            const max = Math.ceil(loyalty / totalMin);
            return (min === max) ? max : `${min}–${max}`;
        }
    }
}

function formatPercent(f, loyalty) {
    const number = f(loyalty);
    if (f(loyalty + 1) === 1) return "100%";
    if (f(loyalty - 1) === 1) return "\u{2248}100%";
    return (number * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
}

export default class Conq extends Component {
    constructor() {
        super();
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
    set(fieldNames, value) {
        if (fieldNames.length === 3
        &&  fieldNames[0] === 'off'
        &&  fieldNames[1] === this.state.off.length - 1) {
            this.lastOff[fieldNames[2]] = value;
        }
        this.setState(update(
            this.state, 
            fieldNames.reduceRight(
                (obj, name) => ({ [name]: obj }),
                { $set: value }
            )
        ));
    }
    addOff() {
        this.lastOff = update(this.lastOff, { id: { $set: this.aid++ } })
        this.setState(update(
            this.state, 
            { off: { $push: [this.lastOff] } }
        ));        
    }
    removeOff(i) {
        this.setState(update(
            this.state, 
            { off: { $splice: [[i, 1]] } }
        ));        
    }
    render() {
        const { model, lang } = this.props;
        const conqStats = timesToConq(model, this.state);
        return (<div>
            <label htmlFor="def_pop">{lang('terms.population')}</label>
            <input type="number" id="def_pop"
                min="1" max="99999" step="100" value={this.state.def.pop}
                onChange={event => this.set(['def', 'pop'], +event.target.value)} />
            <label htmlFor="loyalty">{lang('terms.loyalty')}</label>
            <input type="range" id="loyalty"
                min="0" max="200" step="1" value={this.state.loyalty}
                onChange={event => this.set(['loyalty'], +event.target.value)} />
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
                    onChange={event => this.set(['off', i, 'pop'], +event.target.value)} />
                <input type="number" min="1" max="3"
                    value={attacker.admins}
                    onChange={event => this.set(['off', i, 'admins'], +event.target.value)} />
                &times;
                <select value={attacker.tribe}
                    onChange={event => this.set(['off', i, 'tribe'], +event.target.value)}>
                    {model.units.map((raceUnits, index) => raceUnits[8].l
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