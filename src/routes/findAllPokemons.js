const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {//recuperer la liste de tous les pokemons
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()//recuperer la liste de tous les pokemons dans la base de donnees 
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokemon n'a pu etre recuperer . Reesayez dans quelques instants`
        res.status(500).json({ message, data: error })
      });
  })

}