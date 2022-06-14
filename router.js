// Import
var express = require('express');

// Chargement de la configuration
var env         = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config/config.json')[env];

// Chargemnt du controller
var converterCtrl = require('./controllers/ctrlConverter'); // default views

// Router
exports.router = (function() {
  var router = express.Router();

  // Définition des routes de l'application
  router.route('/').get(converterCtrl.homepage);
  router.route('/convert').get(converterCtrl.convert);
  
  return router;
})();
