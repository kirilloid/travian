import { Reducer } from 'redux';

type LangData = any;
export type Lang = (path: string, args?: {[P:string]: string} | string[]) => string;

export type Action = { type: 'lang', payload: LangData };
export type State = LangData;

export function lang(language: string): Promise<Action> {
    return fetch(`/lang/${language}.json`)
        .then(r => r.json())
        .then((payload: LangData) => ({ type: 'lang', payload }) as Action);
}

export const reducer: Reducer<LangData, Action> =
    (state, action) => {
    switch(action.type) {
    case 'lang':
        return action.payload;
    default:
        return state;
    }
};
