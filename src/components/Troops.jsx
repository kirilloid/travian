import React, { Component } from 'react';

function sum([wood, clay, iron, crop]) {
    return wood + clay + iron + crop;
}

export default ({ model, lang }) => class Troops extends Component {
    constructor() {
        super();
        this.state = { tribe: 0 };
    }
    render() {
        const tribeNames = ['romans','teutons','gauls','nature','natar','egyptians','huns'];
        return <div>
            <select value={this.state.tribe}
                onChange={event => this.setState({ tribe: +event.target.value })}>
                {tribeNames
                    .slice(0, model.units.length)
                    .map((name, idx) => <option key={idx} value={idx}>{lang(`objects.tribes.${name}`)}</option>)}
            </select>
            <table>
                <tbody>
                    <tr><td>{lang('terms.name')}</td>
                        <td>{lang('stats.off')}</td>
                        <td>{lang('stats.total_cost')}</td>
                    </tr>
                    {model.units[this.state.tribe].map((unit, u) => <tr key={u}>
                        <td>{lang(`objects.troops.t_${this.state.tribe}_${u}`)}</td>
                        <td>{unit.a}</td>
                        <td>{sum(unit.c)}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}