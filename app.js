const express = require('express');
const app = express();

//import de la configuration
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config/config.json')[env];

var router   = require('./router').router;
var bodyParser  = require('body-parser');

app.set('view engine', 'ejs');
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.serverport, function() {
    console.log('Serveur en écoute sur : http://localhost:'+ config.serverport);
});


