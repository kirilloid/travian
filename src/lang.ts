import store from './store';

export type Lang = (path: string, args?: {[P:string]: string} | string[]) => string;

export default function lang(path: string, args?: any): string {
    const value: string = path.split('.').reduce(
        (node, key: string) => node && node[key],
        store.getState().lang,
    );
    return value
        ? args
            ? value.replace(/\{(\w+)\}/g, (_: string, key: string) => args[key])
            : value
        : '##' + path + '##';
}
