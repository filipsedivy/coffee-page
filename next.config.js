const path = require('path')

module.exports = {
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        return config
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}