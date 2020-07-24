module.exports = app => {
    /**
     * Se o valor passado não existir, ocorre um erro
     * 
     * @param {any} value valor a ser verificado pela função
     * @param {String} msg mensagem de erro a ser exibida
     */
    function existsOrError(value, msg) {
        if (!value) throw msg
        // Se for uma string vazia
        if (Array.isArray(value) && value.length === 0) throw msg
        // Se for um array vazio
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    /**
     * Se o valor passado existir, ocorre um erro
     * 
     * @param {any} value valor a ser verificado pela função
     * @param {String} msg mensagem de erro a ser exibida
     */
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    /**
     * Verifica se dois valores são iguais
     * 
     * @param {any} valueA 
     * @param {ant} valueB 
     * @param {String} msg mensagem de erro a ser exibida
     */
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }

}

