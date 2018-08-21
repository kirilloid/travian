const data = require('../lang/en');

export type Lang = (path: string, args?: {[P:string]: string} | string[]) => string;

export default function lang(path: string, args: any): string {
    const value = path.split('.')
        .reduce((node, key: string) => node && node[key], data);
    return value
        ? value.replace(/\{(\w+)\}/, (_: never, key: string) => args[key])
        : '##' + path + '##';
}
