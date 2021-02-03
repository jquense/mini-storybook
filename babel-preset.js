const { boolean } = require('yargs')

module.exports = function preset(api, opts = {}) {
  return {
    presets: [
      '@babel/env',
      ['@babel/react', { development: true }],
      opts.typescript && '@babel/typescript',
    ].filter(boolean),
  }
}
