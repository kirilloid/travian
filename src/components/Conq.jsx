import React, { Component } from 'react';

function timesToConq({ loyalty, admins, tribe }) {
    const baseMin = 20;
    const baseMax = tribe === 1 ? 30 : 25;
    const min = Math.ceil(loyalty / (admins * baseMax));
    const max = Math.ceil(loyalty / (admins * baseMin));
    return [min, max];
}

function TimesToConq({ min, max }) {
    return min === max
        ? <b>{max}</b>
        : <b>{min}&ndash;{max}</b>;
}

export default class Troops extends Component {
    constructor() {
        super();
        this.state = {
            loyalty: 100,
            admins: 1,
            tribe: 1
        };
    }
    render() {
        const [min, max] = timesToConq(this.state);
        return (<div>
            <label htmlFor="loyalty">Loyalty</label>
            <input type="range" id="loyalty"
                min="0" max="200" step="1" value={this.state.loyalty}
                onChange={e => this.setState({ ...this.state, loyalty: +e.target.value })} />
            <output>{this.state.loyalty}</output>
            <br />
            <label>
                <input type="number" min="1" max="3"
                    value={this.state.admins}
                    onChange={e => this.setState({ ...this.state, admins: +e.target.value })} />
                &times;
                <select value={this.state.tribe}
                    onChange={e => this.setState({ ...this.state, tribe: +e.target.value })}>
                    <option value="1">Senator</option>
                    <option value="2">Chieftain</option>
                    <option value="3">Chief</option>
                </select>
            </label>
            Times to conquer: <TimesToConq min={min} max={max} />
        </div>);
    }
}