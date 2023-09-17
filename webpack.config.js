const path = require('path');

module.export = {
    entry: './src/index.js',
    output: {
        filenmae: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};