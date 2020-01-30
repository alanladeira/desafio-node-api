const { Router } = require("express")

const userController = require('./controllers/userController')
const taskController = require('./controllers/taskController')

const routes = Router()

routes.use(logRequests)

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {

  console.count("Número de requisições: ");

  return next();
}

/**
 * Retorna todos os projetos
 */
routes.get('/projects', userController.index)

/**
 * Cadastra projetos
 */
routes.post('/projects', userController.store)

/**
 * Altera os projetos pelo id passado
 */
routes.put('/projects/:id', userController.verifyId, userController.update)

/**
 * Deleta os projetos pelo id passado
 */
routes.delete('/projects/:id', userController.verifyId, userController.delete)

/**
 * Cadastra Tarefas nos projetos especificados pelo id
 */
routes.post('/projects/:id/tasks', userController.verifyId, taskController.store)
  
module.exports = routes