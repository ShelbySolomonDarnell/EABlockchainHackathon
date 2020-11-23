var path            = require('path');
var logger          = require('morgan');
var express         = require('express');
var router          = express.Router();
var cors            = require('cors');
var bodyParser      = require('body-parser');
var createError     = require('http-errors');
var cookieParser    = require('cookie-parser');
const config        = require('./config/local.env.json');
const log           = console.log;

const walletManager = require('./src/walletmanage');
const schemaManager = require('./src/schemamanager');

var app = express();

// This line allows for cross-origin requests
// one must also import the cors library
app.use(cors())

// these handle HTTP POST body information, turning it into JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dbMan = require('./src/dbmanager');
// API Service
/*
var mongoose = require('mongoose');
mongoose.connect(config.db.uri + '/' + config.db.name, config.db.options)
  .then( () => console.log('connection successful') )
  .catch( (err) => console.error(err) );
mongoose.set('useFindAndModify', false);
*/
// Required models
// var ServiceSettings = require('./models/ServiceSettings');
//var VybeWallet = require('./models/VybeWallet');

// create api routes
app.use('/api', router); // api root

app.get('/api', function (req, res) {
  res.json({message: "API root!"});
})


/* ----------------------------------------------------------------------------
   API Wallet Endpoints
 ---------------------------------------------------------------------------- */

app.get( '/api/schema/createTest', function(req, res) {
  schemaManager.createTestSchema(walletManager.getStewardWallet(), req, res);
})

app.post( '/api/wallet/UpdateData', function(req, res) {
  walletManager.updateIndyWallet(req, res);
})

app.post( '/api/wallet/Exists', function(req, res) {
  //console.log('About to call separated function');
  walletManager.walletExists(req, res);
}) 

app.post( '/api/wallet/Create', function(req, res) {
  walletManager.createIndyWallet(req, res);
})

app.post( '/api/wallet/Login', function(req, res) {
  walletManager.loginToIndyWallet(req, res);
})

app.post( '/api/wallet/Close', function(req, res) {
  walletManager.closeIndyWallet(req,res);
})

app.get( '/api/wallet/GetUserWalletList', function(req, res) {
  walletManager.getUserWalletList(req,res);
}) 

// API Pool Endpoints
app.get('/api/pool/List', function(req, res) {
  // Pools don't need to be in an external database.
  // The pools can be listed at any time.
  walletManager.getPoolList(res);
});

app.post('/api/pool/CreateInitial', function(req, res) {
  walletManager.createInitialPool(req, res);
});

/**
 * The code here needs to come after the HTTP endpoint code
 * otherwise it will not work. It's my assuption this is due
 * to the path manipulation that occurs.
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

try {
  walletManager.setupStewardEndorser()
} catch(e) {
  log("ERROR occured: " + e)
}

module.exports = app;