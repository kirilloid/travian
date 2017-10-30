import React, { Component } from 'react';
import RadioGroup from '../widgets/RadioGroup';
import { Unit as UnitIcon,
         Stat as StatIcon,
         Tribe as TribeIcon,
         Res as ResIcon } from './Icon';
import { timeI2S, resSum } from '../utils';

const Unit = ({ lang, unit, tribe, index }) =>
    <tr>
        <td className="value-icon"><UnitIcon tribe={tribe} unit={index} /></td>
        <td className="value-text">{lang(`objects.troops.t_${tribe}_${index}`)}</td>
        <td className="value-numeric">{unit.a}</td>
        <td className="value-numeric">{unit.di}</td>
        <td className="value-numeric">{unit.dc}</td>
        <td className="value-numeric">{unit.v}</td>
        <td className="value-numeric">{unit.p}</td>
        <td className="value-numeric">{unit.c[0]}</td>
        <td className="value-numeric">{unit.c[1]}</td>
        <td className="value-numeric">{unit.c[2]}</td>
        <td className="value-numeric">{unit.c[3]}</td>
        <td className="value-numeric">{resSum(unit.c)}</td>
        <td className="value-numeric">{unit.u}</td>
        <td className="value-numeric"
            title={lang('per_day', Math.floor(86400 / unit.t))}
            >{timeI2S(unit.t)}</td>
    </tr>

const TroopsTable = ({ lang, units, tribe }) =>
    <table className="wire">
        <tbody>
            <tr><th>{lang('terms.ico')}</th>
                <th>{lang('terms.name')}</th>
                <th><StatIcon type='off' title={lang('stats.off')} /></th>
                <th><StatIcon type='def_i' title={lang('stats.def_i')} /></th>
                <th><StatIcon type='def_c' title={lang('stats.def_c')} /></th>
                <th><StatIcon type='speed' title={lang('stats.speed')} /></th>
                <th><StatIcon type='cap' title={lang('stats.capacity')} /></th>
                <th><ResIcon res={1} title={lang('stats.r_0')} /></th>
                <th><ResIcon res={2} title={lang('stats.r_1')} /></th>
                <th><ResIcon res={3} title={lang('stats.r_2')} /></th>
                <th><ResIcon res={4} title={lang('stats.r_3')} /></th>
                <th><ResIcon res={6} title={lang('stats.total_cost')} /></th>
                <th><ResIcon res={5} title={lang('stats.crop_usage')} /></th>
                <th><ResIcon res={7} title={lang('stats.train_time')} /></th>
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