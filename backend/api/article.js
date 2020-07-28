const queries = require('./querys');

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        // Caso existe um ID na requisição, trata-se de uma alteração
        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }


        // Caso de alteração de um artigo
        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { //inserção
            console.log("ENTROU");
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    /**
     * Remove um article do banco de dados
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    // Limite de artigos em cada página
    const limit = 3

    /**
     * Captura os artigos de forma paginada
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const get = async (req, res) => {
        const page = req.query.page || 1

        // Verifica a quantidade de registros na tabela
        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    /**
     * Captura todos os artigos dentro de um determinada
     * categoria
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)

        // Gera um array de IDs
        const ids = categories.rows.map(c => c.id)

        // Acessando duas tabelas, usando alias
        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}