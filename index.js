const express = require('express')

const server = express()

server.use(express.json())

const projects = []

/**
 * Middleware que checa se o projeto existe
 */
function verifyId(req, res, next){
  const { id } = req.params

  if(!projects[id]){
    return res.status(400).json('Id dont exists')
  }

  return next()
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests)

/**
 * Cadastra novos projetos
 */
server.post('/projects', (req, res)=>{
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  //retorna o projeto cadastrado
  return res.json(project)
})

/**
 * Retorna todos os projetos
 */
server.get('/projects', (req, res)=>{

  reqCount+=1

  return res.json(projects)
})

/**
 * Altera os projetos pelo id passado
 */
server.put('/projects/:id', verifyId, (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  reqCount+=1

  projects[id].title = title

  return res.json(projects)
})

/**
 * Deleta os projetos pelo id passado
 */
server.delete('/projects/:id', verifyId, (req, res)=>{
  const { id } = req.params

  projects.splice(id, 1)

  //por boa pratica de codigo o delete nao retorna nada
  return res.send()
})

/**
 * Cadastra Tarefas nos projetos especificados pelo id
 */
server.post('/projects/:id/tasks', verifyId, (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  reqCount+=1

  projects[id].tasks.push(title)

  return res.json(project)
})

server.listen(3000)