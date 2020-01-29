const express = require('express')

const server = express()

server.use(express.json())

const projects = []

server.post('/projects', (req, res)=>{
  const { id, title, tasks } = req.body

  projects.push({id, title, tasks})

  return res.json(projects)

})

server.get('/projects', (req, res)=>{
  return res.json(projects)
})

server.put('/projects/:id', (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  projects[id].title = title

  return res.json(projects)
})

server.delete('/projects/:id', (req, res)=>{
  const { id } = req.params

  projects.splice(id, 1)

  return res.send('User has been deleted')
})

server.post('/projects/:id/tasks', (req, res)=>{
  const { id } = req.params
  const { title } = req.body

  projects[id].tasks.push(title)

  return res.json(projects)

})

server.listen(3000)