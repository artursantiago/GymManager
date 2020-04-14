const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');

const server = express();


 /**
 * Allows to use static files
 * that are in the folder provided
 */
server.use(express.static('public'));
/**
 * Allows acess to the req.body data
 */
server.use(express.urlencoded({ extended: true }))
/**
 * Allows to use more then Post and Get mehtods
 * 
 * OBS: Need to be called before the routes, 
 * to override the method be successfull
 */
server.use(methodOverride('_method'));
/**
 * Using the routes
 */
server.use(routes);

server.set('view engine', 'njk');

// Folder containing the files to be shown.
nunjucks.configure('src/app/views', {
  express: server,
  // Allows to insert HTML code inside variables
  autoescape: false, 
  noCache: true,
});

server.listen(5000, () => {
  console.log('server is running');
});