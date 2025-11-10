const { Sequelize, DataTypes } = require('sequelize') 
const PokemonModel = require('../models/pokemon') //obtenir le mpdem ,ecessaore a la creation de la table ^pkemon
const pokemons = require('./mock-pokemon') //obtenir la liste des pokemons
  
const sequelize = new Sequelize('pokedex', 'root', '', {//connexion a la base de donnee
  host: 'localhost',
  dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Etc/GMT-2',
//   },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes) //creation de notre table pokemons 
  
const initDb = () => {//inserer les informations de tous les pokemon dans la table pokemons
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon
}