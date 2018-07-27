let util = require('../utils')

/**
 * This method inserts a new article
 * @param {string}title
 * @param {string}description
 * @returns {Promise<void>}
 */
insertArticle = async (title, description) => {
    try{
        let article = {title: title, description: description}
        await util.mongoUtil.db().collection('article_collection')
            .insertOne(article)
        return article
    }
    catch(err)
    {
        util.logger.error(err)
        return Promise.reject(err)
    }
}

/**
 * This method returns a single article by providing _id field
 * @param {ObjectId}articleId
 * @returns {Promise<void>}
 */
getArticleById = async (articleId) => {
    return await util.mongoUtil.db().collection('article_collection')
        .findOne({_id: util.mongoUtil.ObjectId(articleId)})
}

/**
 * This method deletes article by _id
 * @param {ObjectId}articleId
 * @returns {Promise<void>}
 */
deleteArticle = async (articleId) => {
    return await util.mongoUtil.db().collection('article_collection')
        .deleteOne({_id: util.mongoUtil.ObjectId(articleId)})
}

exports.insertArticle = insertArticle;
exports.getArticleById = getArticleById
exports.deleteArticle = deleteArticle;