var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './build'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
              options: {
                sourceMap: true
              }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
