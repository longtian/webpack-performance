/**
 * Created by yan on 15-12-18.
 */
var path = require('path');
module.exports = {
    entry: path.join(__dirname, 'entry.js'),
    output: {
        publicPath:'build/',
        path:path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/(.woff2|.svg|.ttf|.woff2|.woff|.eot)$/,
                loader:'file'
            }
        ]
    }
}