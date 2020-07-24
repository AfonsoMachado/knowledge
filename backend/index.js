const app = require('express')()
const consign = require('consign')
// Knex configurado para o banco de dados correto
const db = require('./config/db')
const mongoose = require('mongoose')
// Estabelecendo conexão com o mongodb
require('./config/mongodb')
const port = 3000

app.db = db
app.mongoose = mongoose

// Injeta o parametro app em cada uma das dependeicas que são carregadas no then do consign
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api') // Carrega toda a pasta API
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log(`Backend executando na porta ${port}...`);
})