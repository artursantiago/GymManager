const express = require('express');
const nunjucks = require('nunjucks');

const routes  = require('./routes');

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
 * Using the routes
 */
server.use(routes);
 
server.set('view engine', 'njk');

// Folder containing the files to be shown.
nunjucks.configure('views', {
  express: server,
  // Allows to insert HTML code inside variables
  autoescape: false, 
  noCache: true,
});

server.listen(5000, () => {
  console.log('server is running');
});