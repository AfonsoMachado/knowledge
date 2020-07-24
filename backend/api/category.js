module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    /**
     * Insere ou altera uma categoria no banco de dados, capturando os parâmetros
     * passados pela requisição
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const save = (req, res) => {
        const category = { ...req.body }
        // Caso existe um ID na requisição, trata-se de uma alteração
        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        // Alteração
        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // inserção
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    /**
     * Remove uma categoria do banco de dados com base no ID
     * enviado na requisição
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não foi informado')

            // Verifica se uma categoria tem subcategorias
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')

            // Verifica se uma categoria tem artigos associados
            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos.')

            // Excluindo a categoria
            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada')

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    /**
     * Adiciona o path de forma ordenada dentro categoria
     * 
     * @param {Array} categories 
     */
    const withPath = categories => {
        /**
         * Busca a categoria pai de uma categoria
         * 
         * @param {Array} categories 
         * @param {Number} parentId 
         * @returns {Number} ID do pai
         */
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        // lista com todos os paths encontrados
        const categoriesWithPath = categories.map(category => {
            // Categoria atual
            let path = category.name
            // Busca o pai da categoria atual
            let parent = getParent(categories, category.parentId)

            // Montando o path completo
            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        /**
         * Ordenação 
         */
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        // Retorna ordenado pelo path
        return categoriesWithPath
    }

    /**
     * Captura todas as categorias, incluindo o path de cada 
     * uma delas
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories))) // Captura as categorias inculindo o caminho
            .catch(err => res.status(500).send(err))
    }

    /**
     * Recebe uma requisição que aguarda a resposta de um elemento categoria
     * obtido atrvés de um ID passado
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    /**
     * Monta uma arvore de categorias, tendo como base
     * a estutura de pais e filhos das categorias
     * 
     * @param {Array} categories array contendo todos as categorias
     * @param {Object} tree 
     * 
     * @returns retorna um `Object` contendo a árvore
     */
    const toTree = (categories, tree) => {
        // Caso a arvore esteja vazia, usa primeiramente as categorias que não tem parentId
        if (!tree) tree = categories.filter(c => !c.parenteId)

        // Verifica quais os filhos de parentNode
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            // Chamando toTree passando somente os filhos diretos de parentNode
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree

    }

    /**
     * Recebe uma requisição HTTP get esperando uma resposta
     * contendo a árvore de categorias, considerando pais e filhos
     *  de cada categoria
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTree }
}