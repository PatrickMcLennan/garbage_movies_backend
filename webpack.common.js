/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node14',
  context: __dirname,
  entry: {
    createAccount: './lambda/createAccount.ts',
    profilePicturePresignedUrl: './lambda/profilePicturePresignedUrl.ts',
    hello: './lambda/hello.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lambda'),
    libraryTarget: 'commonjs',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
