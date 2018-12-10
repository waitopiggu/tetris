const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const package = require('./package');

const config = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: `style-loader!css-loader?${
          'modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
        }`
      },
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
    extensions: ['*', '.css', '.js', '.jsx'],
  },
};

module.exports = config;
