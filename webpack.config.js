const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const package = require('./package');

const config = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, './index.js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node\_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.description,
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = config;
