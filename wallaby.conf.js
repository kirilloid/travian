module.exports = function(wallaby) {
    return {
        files: [
            'src/**/*.ts',
        ],
        tests: [
            'src/**/*.spec.ts'
        ],
        env: {
            type: 'node',
            runner: 'ts-node'
        }
    };
};
