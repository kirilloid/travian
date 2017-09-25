import React, { Component } from 'react';
import { Unit as UnitIcon } from './Icon';

function sum([wood, clay, iron, crop]) {
    return wood + clay + iron + crop;
}

export default ({ model, lang }) => class Troops extends Component {
    constructor() {
        super();
        this.state = { tribe: 0 };
    }
    render() {
        const t = this.state.tribe;
        const tribeNames = ['romans','teutons','gauls','nature','natar','egyptians','huns'];
        return <div>
            <select value={t}
                onChange={event => this.setState({ tribe: +event.target.value })}>
                {tribeNames
                    .slice(0, model.units.length)
                    .map((name, idx) => <option key={idx} value={idx}>{lang(`objects.tribes.${name}`)}</option>)}
            </select>
            <table>
                <tbody>
                    <tr><td>{lang('terms.icon')}</td>
                        <td>{lang('terms.name')}</td>
                        <td>{lang('stats.off')}</td>
                        <td>{lang('stats.total_cost')}</td>
                    </tr>
                    {model.units[t].map((unit, u) => <tr key={u}>
                        <td><UnitIcon tribe={t} unit={u} /></td>
                        <td>{lang(`objects.troops.t_${t}_${u}`)}</td>
                        <td>{unit.a}</td>
                        <td>{sum(unit.c)}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}