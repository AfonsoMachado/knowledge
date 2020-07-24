// Update with your config settings.
// Configuração do banco de dados

module.exports = {

  client: 'postgresql',
  connection: {
    database: 'knowledge',
    user: 'postgres',
    password: '2142'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
