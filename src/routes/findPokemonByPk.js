const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(!pokemon){
            const message ='Le pokémon demandé n existe pas. Réessayer avec un autre identifiant '
            return res.status(404).json({message});
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(err => {
        const message = `Le pokemmon n ' a pu etre recupere . Reessayer dans quelques instants`
        res.statut(500).json({message, data:err})
      })
  })
}