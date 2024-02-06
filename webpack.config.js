const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //environmental variables to change Development / Production Modes
  mode: process.env.NODE_ENV,
  //entry point to create bundle
  entry: './client/src/index.js',
  //create the bundle.js in 'dist' folder
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    // port: 8080 by default
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: {
      // need to list for every endpoint used
      '/map': 'http://localhost:3000',
      '/listing': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/upload': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // order reads right to left (turns sass files to css to style string)
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  resolve: {
    // these files can be imported without specifying extension
    extensions: ['.js', '.jsx'],
  },
};
