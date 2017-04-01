var path = require('path')
var webpack = require('webpack')
var plugins = []

plugins.push(new webpack.DefinePlugin({
  'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}
}))

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loaders: [
          'react-hot-loader',
          'babel-loader',
          'eslint-loader'
        ]
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }, {
        test: /\.json$/,
        loaders: 'json-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              bypassOnDebug: true,
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: true },
              optipng: { optimizationLevel: 10 },
              pngquant: { quality: '75-90', speed: 3 },
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      }
    ]
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src'),
      Ionicons: path.resolve('node_modules', 'ionicons', 'dist', 'css'),
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ]
  },
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: plugins,
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
    proxy: {
      '/poll': {
        target: 'http://localhost:3001'
      },
    }
  }
}
