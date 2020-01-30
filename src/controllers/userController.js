const projects = []

module.exports = {
  /**
 * Middleware que checa se o projeto existe
 */
verifyId(req, res, next){
  const { id } = req.params
  const project = projects.find((el)=>el.id == id)

  if(!project){
    return res.status(400).json('Id dont exists')
  }

  return next()
},

  index(req, res){      
      return res.json(projects)
  },
  
  store(req, res){   
      const { id, title } = req.body

      const project = {
        id,
        title,
        tasks: []
      }

      projects.push(project)

      //retorna o projeto cadastrado
      return res.json(projects)
    },

    update(req, res){
      const { id } = req.params
      const { title } = req.body

      const project = projects.find((el)=>el.id == id)

      project.title=title

      return res.json(projects)
    },

    delete(req, res){
      const { id } = req.params

      const index = projects.findIndex((el)=> el.id == id)  

      projects.splice(index, 1)

      //por boa pratica de codigo o delete nao retorna nada
      return res.send()
    }
  }

