const data = require('../lang/en');

/**
 * localizes string
 * @param {string[]} path within JSON
 * @param {any} args extra arguments: array/object
 * @returns {string}
 */
export default function lang(path, args) {
    const value = path.split('.')
        .reduce((node, key) => node && node[key], data)
    return value
        ? value.replace(/\{(\w+)\}/, (_, key) => args[key])
        : '##' + path + '##';
}