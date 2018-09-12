import { Reducer } from 'redux';
import { VModel } from '../model/types';
import { modelFromVersion, getInitialModel } from '../model';

export type Action = { type: 'server', stringVersion: string };
export function server(version: string): Action {
    return { type: 'server', stringVersion: version };
}

const initialState: VModel = getInitialModel(document.referrer);

export type State = VModel;

export const reducer: Reducer<VModel, Action> = (
    state: VModel = initialState,
    action: Action,
) => {
    switch (action.type) {
    case 'server':
        return modelFromVersion(action.stringVersion);
    default:
        return state;
    }
};
