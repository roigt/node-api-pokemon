const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize')

module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {

        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      }).catch(err => {
        if(err instanceof ValidationError){//gestion des erreurs de validation
          return res.status(400).json({ message:err.message, data:err})
        }
        if(err instanceof UniqueConstraintError){
          return res.status(400).json({ message:err.message, data:err})
        }
        const message = `Le pokemmon n ' a pu etre ajouter . Reessayer dans quelques instants`
        res.status(500).json({message, data:err})
      })
  })
}