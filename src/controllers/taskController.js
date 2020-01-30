const projects = require('../utils/projects')

module.exports = {  
  store(req, res){
  const { id } = req.params
  const { title } = req.body

  const project = projects.find((el)=> el.id == id)

  project.tasks.push(title)

  return res.json(project)
  }

}