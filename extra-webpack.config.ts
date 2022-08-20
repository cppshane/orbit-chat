import * as NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

module.exports = {
  node: { global: true },
  plugins: [new NodePolyfillPlugin()]
};
