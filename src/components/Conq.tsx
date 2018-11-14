import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { State as RootState } from '../store';

import { loyalty, updateDef, updateOff, deleteOff, addOff } from './conq.redux';

import { isAdmin, UnitAdmin } from '../model/types';
import lang from '../lang';

import { roundP, limit, compose } from '../utils';
import { numericInt, range } from '../utils/probability';
import { State, OffSide, Action } from './conq.redux';

const popMalus = compose(roundP(1e-3), limit(0.667, 1));

function timesToConq(units: [number, number][], { def, off }: State) {
    const ranges: range[] = [];
    let totalMin = 0;
    let totalMax = 0;
    const steps = off.map(({ pop, brew, party, tribe, admins }) => {
        const malus = popMalus((def.pop / pop) ** 0.2)
                    * (brew ? 0.5 : 1);
        const patty = (party ? 5 : 0)
                    - (def.party ? 5 : 0);
        const [min, max] = units[tribe]
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
        },
    };
}

function formatPercent(f: (v: number) => number, loyalty: number): string {
    const number = f(loyalty);
    if (f(loyalty + 1) === 1) { return '100%'; }
    if (f(loyalty - 1) === 1) { return '≈100%'; }
    return (number * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
}

const getAdmins = createSelector(
    (state: RootState) => state.model.units,
    units => units.map(raceUnits => raceUnits.find(isAdmin)),
);
const getAdminsValues = createSelector(
    getAdmins,
    admins => admins.map(a => a ? a.l : [0, 0]) as [number, number][],
);
const getConqStats = createSelector(
    getAdminsValues,
    (state) => state.conq,
    (nums, state) => timesToConq(nums, state),
);

type ConqOffOwnProps = {
    attacker: OffSide,
    index: number,
};

type ConqOffDerivedProps = {
    admins: (UnitAdmin | undefined)[],
    conqStats: any,
    state: State,
};

function mapStateToProps(state: RootState): ConqOffDerivedProps {
    return {
        admins: getAdmins(state),
        conqStats: getConqStats(state),
        state: state.conq,
    };
}

const ConqOff: React.ComponentClass<ConqOffOwnProps> = connect<ConqOffDerivedProps, {}, ConqOffOwnProps, RootState>(mapStateToProps)(
({ dispatch, ...props }: ConqOffDerivedProps & ConqOffOwnProps & { dispatch: Dispatch<Action> }) => {
    const { attacker, index, admins, conqStats, state } = props;
    return <div key={attacker.id}>
        <button onClick={() => dispatch(deleteOff(index))}>–</button>
        <label htmlFor={`off_pop_${index}`}>
            {lang('terms.population')}
        </label>
        <input type="number"
            id={`off_pop_${index}`}
            min="1" max="99999" step="100" value={attacker.pop}
            onChange={event => dispatch(updateOff(index, { pop: +event.target.value }))} />
        <input type="number" min="1" max="3"
            value={attacker.admins}
            onChange={event => dispatch(updateOff(index, { admins: +event.target.value }))} />
        &times;
        <select value={attacker.tribe}
            onChange={event => dispatch(updateOff(index, { tribe: +event.target.value }))}>
            {admins.map((unit, index) => unit
                ? <option value={index} key={index}>
                    {lang(`objects.troops.t_${index}_8`)}
                    </option>
                : null)}
        </select>
        |
        <span>{formatPercent(conqStats.steps[index], state.loyalty)}</span>
    </div>;
});

const Conq = (
    { dispatch, conqStats, state }: { dispatch: Dispatch<Action>, conqStats: any, state: State },
) => {
    return <div>
        <label htmlFor="def_pop">{lang('terms.population')}</label>
        <input type="number" id="def_pop"
            min="1" max="99999" step="100" value={state.def.pop}
            onChange={event => dispatch(updateDef({ pop: +event.target.value }))} />
        <label htmlFor="loyalty">{lang('terms.loyalty')}</label>
        <input type="range" id="loyalty"
            min="0" max="200" step="1" value={state.loyalty}
            onChange={event => dispatch(loyalty(+event.target.value))} />
        <output>{state.loyalty}</output>
        <br />
        {lang('conq_chance')}
        {state.off.map((attacker, i) => <ConqOff attacker={attacker} index={i} />)}
        <button onClick={() => dispatch(addOff())}>+</button>
        <span dangerouslySetInnerHTML={{
            __html: lang('conq_times', [conqStats.total(state.loyalty)])}} />
    </div>;
};

export default connect((state: RootState) => {
    return {
        conqStats: getConqStats(state),
        state: state.conq,
    };
})(Conq);
