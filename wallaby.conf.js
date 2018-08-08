module.exports = function(wallaby) {
    return {
        testFramework: 'tape',
        files: [
            '!src/**/*.spec.ts',
            'src/**/*.ts',
        ],
        tests: [
            'src/**/*.spec.ts',
        ],
        env: {
            type: 'node'
        }
    };
};
