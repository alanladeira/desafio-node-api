const express = require('express')

const server = express()

server.use(express.json())

const projects = []
let reqCount = 0


function verifyId(req, res, next){
  const { id } = req.params

  if(!projects[id]){
    return res.status(400).json('Id dont exists')
  }

  next()
}

server.use('/projects', (req, res, next)=>{
  console.log(reqCount)

  next()
})

server.post('/projects', (req, res)=>{
  const { id, title, tasks } = req.body

  reqCount+=1

  projects.push({id, title, tasks})

  return res.json(projects)
})

server.get('/projects', (req, res)=>{

  reqCount+=1

  return res.json(projects)
})

server.put('/projects/:id', verifyId, (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  reqCount+=1

  projects[id].title = title

  return res.json(projects)
})

server.delete('/projects/:id', verifyId, (req, res)=>{
  const { id } = req.params

  projects.splice(id, 1)

  return res.send('User has been deleted')
})

server.post('/projects/:id/tasks', verifyId, (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  reqCount+=1

  projects[id].tasks.push(title)

  return res.json(projects)
})

server.listen(3000)