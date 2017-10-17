import React, { Component } from 'react';

function timesToConq({ units }, { loyalty, admins, tribe }) {
    const [baseMin, baseMax] = units[tribe][8].l;
    const min = Math.ceil(loyalty / (admins * baseMax));
    const max = Math.ceil(loyalty / (admins * baseMin));
    return (min === max) ? max : `${min}–${max}`;
}

export default class Conq extends Component {
    constructor() {
        super();
        this.state = {
            loyalty: 100,
            admins: 1,
            tribe: 0
        };
        this.setAdmins  = this.set.bind(this, 'admins');
        this.setTribe   = this.set.bind(this, 'tribe');
        this.setLoyalty = this.set.bind(this, 'loyalty');
    }
    set(fieldName, value) {
        this.setState({ ...this.state, [fieldName]: value });
    }
    render() {
        const { model, lang } = this.props;
        return (<div>
            <label htmlFor="loyalty">{lang('terms.loyalty')}</label>
            <input type="range" id="loyalty"
                min="0" max="200" step="1" value={this.state.loyalty}
                onChange={event => this.setLoyalty(+event.target.value)} />
            <output>{this.state.loyalty}</output>
            <br />
            <label>
                <input type="number" min="1" max="3"
                    value={this.state.admins}
                    onChange={event => this.setAdmins(+event.target.value)} />
                &times;
                <select value={this.state.tribe}
                    onChange={event => this.setTribe(+event.target.value)}>
                    {model.units.map((raceUnits, index) => raceUnits[8].l
                        ? <option value={index} key={index}>
                            {lang(`objects.troops.t_${index}_8`)}
                            </option>
                        : null)}
                </select>
            </label>
            {lang('conq_times', [timesToConq(model, this.state)])}
        </div>);
    }
}