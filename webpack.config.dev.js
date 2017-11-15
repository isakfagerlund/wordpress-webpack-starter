var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(env) {
    return {
      entry: "./assets/js/app.js",
       output: {
           path: __dirname + "/dist",
           filename: "bundle.js"
       },
       module: {
            loaders: [
                {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/},
                {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader", exclude: /node_modules/},
                {test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/, loader: 'url-loader', exclude: /node_modules/},
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
          new BrowserSyncPlugin(
            {
            host: 'localhost',
            port: 1337,
            // Change this to your prefered port
            proxy: 'http://localhost:8888',
            files: [
                {
                    match: [
                        '**/*.php'
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
          }
        )
        ]
    }
}