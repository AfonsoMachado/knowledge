const config = require('../knexfile.js')

// Instanciando o Knex passando o arquivo de configuração
const knex = require('knex')(config)
// Executando a migration no momemnto em que o backend é carregado
knex.migrate.latest([config])

module.exports = knex