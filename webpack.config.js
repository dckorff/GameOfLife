
// const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {

    entry: "./src/app.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};  