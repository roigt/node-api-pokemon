const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id == 1) next('route');
    // otherwise pass the control to the next middleware function in this stack
    else next(); //
  }, function (req, res, next) {
    // render a regular page
    // res.send('regular');
    next(); //
  });
  
  // handler for the /user/:id path, which renders a special page
  app.get('/user/:id', function (req, res, next) {
     Pokemon.findByPk(req.params.id)
     .then(pokemon=>{
        res.json({data:pokemon})
     })
    
   
  });

}