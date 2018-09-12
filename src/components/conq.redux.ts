import { Reducer } from 'redux';
import { extend } from '../utils';

export type OffSide = {
    id: number,
    pop: number,
    tribe: number,
    admins: number,
    party: boolean,
    brew: boolean,
};

export type DefSide = {
    pop: number,
    party: boolean,
};

export type State = {
    loyalty: number,
    def: DefSide,
    off: OffSide[],
};

export type Action = { type: 'loyalty', value: number }
                    | { type: 'updateDef', update: Partial<DefSide> }
                    | { type: 'addOff' }
                    | { type: 'updateOff', index: number, update: Partial<OffSide> }
                    | { type: 'deleteOff', index: number }
                    ;

let id = 0;
const createOff = () => ({
    id: id++,
    pop: 3000,
    tribe: 0,
    admins: 1,
    party: false,
    brew: false,
});

const initialState: State = {
    loyalty: 100,
    def: {
        pop: 1000,
        party: false,
    },
    off: [createOff()],
};

export function loyalty(value: number): Action {
    return { type: 'loyalty', value }; }
export function updateDef(update: Partial<DefSide>): Action {
    return { type: 'updateDef', update }; }
export function addOff(): Action {
    return { type: 'addOff' }; }
export function updateOff(index: number, update: Partial<OffSide>): Action {
    return { type: 'updateOff', index, update }; }
export function deleteOff(index: number): Action {
    return { type: 'deleteOff', index }; }

export const reducer: Reducer<State, Action> =
    (state = initialState, action) => {
        switch (action.type) {
        case 'loyalty':
            return extend(state, { loyalty: action.value });
        case 'updateDef':
            return extend(state, { def: action.update });
        case 'addOff':
            return extend(state, { off: { [state.off.length]: createOff() } });
        case 'updateOff':
            return extend(state, { off: { [action.index]: action.update } });
        case 'deleteOff':
            return {
                ...state,
                off: state.off.filter((_, i) => i === action.index),
            };
        default:
            return state;
        }
    };
