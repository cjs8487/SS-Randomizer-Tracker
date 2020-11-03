module.exports = {
    test: /\.(js|mjs)$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [
            [
                require.resolve('babel-preset-react-app/dependencies'),
                {helpers: true},

            ],
            '@babel/preset-env', '@babel/preset-react'
        ],
        plugins: ["@babel/plugin-proposal-class-properties", { "loose": true }]
    }
}