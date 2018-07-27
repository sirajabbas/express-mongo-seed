const express = require('express'),
    apiRouter = express.Router(),
    util = require('../utils/'),
    controllers = require('../controllers');

apiRouter.post('/auth', controllers.authController.login)
apiRouter.post('/article/create', util.authHelper.authorize, controllers.articleController.addArticle)
apiRouter.get('/article/:articleId', util.authHelper.authorize, controllers.articleController.getArticleById)
apiRouter.delete('/article/:articleId', util.authHelper.authorize, controllers.articleController.deleteArticle)


//exporting router
module.exports = apiRouter;