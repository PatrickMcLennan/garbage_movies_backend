/* eslint-disable @typescript-eslint/no-var-requires */

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: `development`,
  devtool: 'inline-source-map',
});
