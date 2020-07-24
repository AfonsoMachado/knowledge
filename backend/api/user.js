// biblioteca usada para criptografar a senha do usuario
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    /**
     * Gera um criptografia no banco de dados para a senha do usuário
     * 
     * @param {string} password 
     */
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    /**
     * Insere ou altera um usuario no banco de dados, capturando os parâmetros
     * passados pela requisição
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const save = async (req, res) => {
        // Clona o corpo da requisição
        const user = { ...req.body }
        // Caso exista um id na requisição, para casos onde é feita uma alteração de usuario
        if (req.params.id) user.id = req.params.id

        if (!req.originalUrl.startsWith('/users')) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        // Validações necessárias
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            // Verifica se um usuario ja existe
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()

            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            // Mandando um erro 400, erro no client
            return res.status(400).send(msg)
        }

        // Criptografando a senha do usuario
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        // Altrerar usuario
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // Inserir usuario
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    /**
     * Captura os usuarios do banco de dados
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    /**
     * Capturando um usuário usuário do banco de dados com base
     * no ID passado na requisição
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    /**
     * Exclusão de usuario usando soft delete
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const remove = async (req, res) => {

        // Caso exista um artigo atrelado ao usuario, o mesmo nao pode ser excluido
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    // Retornando todos os métodos
    return { save, get, getById, remove }
}