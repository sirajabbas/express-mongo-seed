let util = require('../utils'),
    services = require('../services');

//api handler to create new article
addArticle = async (req, res) => {
    try {
        let article = await services.articleService.insertArticle(req.body.title, req.body.description)
        return util.responseMessageHelper.writeResponseMessage(res, 200, 'ok', {article: article})
    }
    catch (err) {
        console.log(err)
        util.logger.error(err)
        return util.responseMessageHelper.writeResponseMessage(res, 500, 'error', 'internal serevr error', err)
    }
}
//api handler to get an article by article id
getArticleById = async (req, res) => {
    try {
        let article = await services.articleService.getArticleById(req.params.articleId)
        return util.responseMessageHelper.writeResponseMessage(res, 200, 'ok', {article: article})
    }
    catch (err) {
        util.logger.error(err)
        return util.responseMessageHelper.writeResponseMessage(res, 500, 'error', 'internal server error', err)
    }
}

//api handler to delete an article
deleteArticle = async (req, res) => {
    try {
        await services.articleService.deleteArticle(req.params.articleId)
        return util.responseMessageHelper.writeResponseMessage(res, 200, 'ok', {
            success: true
        })
    }
    catch (err) {
        util.logger.error(err)
        return util.responseMessageHelper.writeResponseMessage(res, 500, 'error', 'internal server error', err)
    }
}


exports.addArticle = addArticle;
exports.getArticleById = getArticleById;
exports.deleteArticle = deleteArticle;