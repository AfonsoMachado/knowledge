
/**
 * Consulta que retorna o ID da propria categoria passada como parametro
 * unindo com o id da sunbcategoria, fazendo um join com a tabela de categorias
 * onde o "parentId" = subcategories.id
 * 
 * Ao final retorna os IDs baseado no ID pai
 */
module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}

