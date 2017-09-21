import data from '../lang/en.json';

export default function lang(path, args) {
    const value = path.split('.')
        .reduce((node, key) => node && node[key], data)
    return value
        ? value.replace(/\{(\w+)\}/, (_, key) => args[key])
        : path;
}