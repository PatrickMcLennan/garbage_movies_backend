/* eslint-disable @typescript-eslint/no-var-requires */

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: `production`,
  devtool: false,
});
