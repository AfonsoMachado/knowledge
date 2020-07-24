const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * Recebe a instância do app express como parâmetro
 * aplicando os middlewares descritos na função
 * 
 * @param {Function} app 
 */
module.exports = app => {
    // Aplicando um middleware que intepreta um json, no corpo da requisição
    app.use(bodyParser.json())
    app.use(cors())
}