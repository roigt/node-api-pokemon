const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;


app
 .use(favicon(__dirname +'/favicon.ico'))
 .use(morgan('dev'))
 .use(bodyParser.json());

//ici , nous placerons les points de terminaison
// const findAllPokemons = require('./src/routes/findAllPokemons');
// findAllPokemons(app);

// const findPokemonByPk = require('./src/routes/findPokemonByPk');
// findPokemonByPk(app);
//ou 


sequelize.initDb();


require('./src/routes/findAllPokemons')(app); 
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/test')(app);


  

//la gestion des erreurs
// app.use(({res})=>{
//     const message = 'Impossible de trouver la ressources demandée ! Vous pouvez essayer une autre url'
//     res.status(400).json({message});
// })

app.listen(port, () => console.log(`Notre application Node est demaree sur : http://localhost:${port}`))
  