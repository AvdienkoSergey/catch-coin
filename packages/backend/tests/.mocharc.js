export default {
    timeout: 5000,
    recursive: true,
    extension: ['js', 'ts'],
    loader: 'esm',
    spec: ['**/*.test.js', '**/*.test.ts'],
    'watch-files': ['**/*.js', '**/*.ts'],
    'watch-ignore': ['node_modules'],
    reporter: 'spec',
    ui: 'bdd',
    colors: true,
    parallel: false,
    bail: false,
    retries: 0,
    slow: 100,
    delay: false,
    diff: true,
    fullTrace: true
}; 