'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API_URL: '"http://localhost:8080/api/"',
  API_PDF_GEN_URL: '"http://localhost:8080/api/pdf-generate/?filters="',
  API_EXCEL_GEN_URL: '"http://localhost:8080/api/xlsx-generate/?filters="',
  // BASE_API_URL: '"http://192.168.0.129:8083/api/"',
  // API_PDF_GEN_URL: '"http://192.168.0.129:8083/api/pdf-generate/?filters="',
  // API_EXCEL_GEN_URL: '"http://192.168.0.129:8083/api/xlsx-generate/?filters="',
  GOOGLE_API_KEY: '"AIzaSyAgdNrDmQgtOxOH7InkEzzHh1mmJuFGuz8"'
})
