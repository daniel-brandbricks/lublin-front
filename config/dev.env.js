'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API_URL: '"http://lublin.local/api/"',
  GOOGLE_API_KEY: '"AIzaSyAgdNrDmQgtOxOH7InkEzzHh1mmJuFGuz8"'
})
