import React, { Component } from 'react';
import RadioGroup from '../widgets/RadioGroup';
import { Unit as UnitIcon,
         Stat as StatIcon,
         Tribe as TribeIcon,
         Res as ResIcon } from './Icon';
import { timeI2S, resSum } from '../utils';

const Unit = ({ lang, unit, tribe, index }) =>
    <tr>
        <td><UnitIcon tribe={tribe} unit={index} /></td>
        <td>{lang(`objects.troops.t_${tribe}_${index}`)}</td>
        <td>{unit.a}</td>
        <td>{unit.di}</td>
        <td>{unit.dc}</td>
        <td>{unit.v}</td>
        <td>{unit.p}</td>
        <td>{unit.c[0]}</td>
        <td>{unit.c[1]}</td>
        <td>{unit.c[2]}</td>
        <td>{unit.c[3]}</td>
        <td>{resSum(unit.c)}</td>
        <td>{unit.u}</td>
        <td>{timeI2S(unit.t)}</td>
    </tr>

const TroopsTable = ({ lang, units, tribe }) =>
    <table>
        <tbody>
            <tr><td>{lang('terms.ico')}</td>
                <td>{lang('terms.name')}</td>
                <td><StatIcon type='off' title={lang('stats.off')} /></td>
                <td><StatIcon type='def_i' title={lang('stats.def_i')} /></td>
                <td><StatIcon type='def_c' title={lang('stats.def_c')} /></td>
                <td><StatIcon type='speed' title={lang('stats.speed')} /></td>
                <td><StatIcon type='cap' title={lang('stats.capacity')} /></td>
                <td><ResIcon res={1} title={lang('stats.r_0')} /></td>
                <td><ResIcon res={2} title={lang('stats.r_1')} /></td>
                <td><ResIcon res={3} title={lang('stats.r_2')} /></td>
                <td><ResIcon res={4} title={lang('stats.r_3')} /></td>
                <td><ResIcon res={6} title={lang('stats.total_cost')} /></td>
                <td><ResIcon res={5} title={lang('stats.crop_usage')} /></td>
                <td><ResIcon res={7} title={lang('stats.train_time')} /></td>
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
            <RadioGroup
                value={tribe}
                onChange={value => this.setState({ tribe: value })}
                buttons={tribeNames
                    .slice(0, units.length)
                    .map((name, idx) => ({
                        content: <TribeIcon tribe={idx+1} />,
                        title: lang(`objects.tribes.${name}`),
                        value: idx
                    }))}
            />
            <TroopsTable lang={lang} units={units[tribe]} tribe={tribe} />
        </div>
    }
}