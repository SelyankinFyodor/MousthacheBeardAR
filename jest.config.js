module.exports = {
    verbose: true,
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file'
    },
    setupFiles: ['./jest.setup.js','jest-canvas-mock']
};

