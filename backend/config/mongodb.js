// Conexão com o MongoDB para atualização de estatísticas
const mogoose = require('mongoose')
// Criando o DB
mogoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .catch(e => {
        // Mensagem de erro caso não seja possível realizar a conexão com o mongodb
        const msg = 'ERRO! Não foi possível conectar com o MongoDB'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })