import React, { Component } from 'react';
import { Unit as UnitIcon } from './Icon';

function sum([wood, clay, iron, crop]) {
    return wood + clay + iron + crop;
}

const Unit = ({ lang, unit, tribe, index }) =>
    <tr>
        <td><UnitIcon tribe={tribe} unit={index} /></td>
        <td>{lang(`objects.troops.t_${tribe}_${index}`)}</td>
        <td>{unit.a}</td>
        <td>{sum(unit.c)}</td>
    </tr>

const TroopsTable = ({ lang, units, tribe }) =>
    <table>
        <tbody>
            <tr><td>{lang('terms.icon')}</td>
                <td>{lang('terms.name')}</td>
                <td>{lang('stats.off')}</td>
                <td>{lang('stats.total_cost')}</td>
            </tr>
            {units.map((unit, u) => <Unit key={u} lang={lang} tribe={tribe} unit={unit} index={u} />)}
        </tbody>
    </table>

export default class Troops extends Component {
    constructor() {
        super();
        this.state = { tribe: 0 };
    }
    render() {
        const { lang, units } = this.props;
        const tribe = this.state.tribe;
        const tribeNames = ['romans','teutons','gauls','nature','natar','egyptians','huns'];
        return <div>
            <select value={tribe}
                onChange={event => this.setState({ tribe: +event.target.value })}>
                {tribeNames
                    .slice(0, units.length)
                    .map((name, idx) => <option key={idx} value={idx}>{lang(`objects.tribes.${name}`)}</option>)}
            </select>
            <TroopsTable lang={lang} units={units[tribe]} tribe={tribe} />
        </div>
    }
}