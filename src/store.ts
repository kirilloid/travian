import { createStore, combineReducers } from 'redux';
import { reducer as conq, State as QState } from './components/conq.redux';
import { reducer as model, State as MState } from './components/model.redux';
import { reducer as lang, State as LState } from './lang.redux';

export type State = {
    conq: QState,
    model: MState,
    lang: LState,
};

export default createStore(combineReducers({
    lang,
    conq,
    model,
}));
