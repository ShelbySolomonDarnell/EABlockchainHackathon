const config     = require('../config/local.env.json');
// API Service
var mongoose = require('mongoose');
mongoose.connect(config.db.uri + '/' + config.db.name, config.db.options)
  .then( () => console.log('connection successful') )
  .catch( (err) => console.error(err) );
mongoose.set('useFindAndModify', false);