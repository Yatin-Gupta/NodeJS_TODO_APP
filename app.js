var express = require('express');
var bodyParser = require('body-parser');
var todoController = require('./controllers/todoController');

var app = express();

// setting template engine

app.set('view engine', 'ejs');

// setting middleware for static files

//app.use('/assets', express.static("./public/assets"));
// for any static file looking for in public directory we can use

app.use(express.static("./public")); // localhost:port/assets/style.css works

// Launch controllers here
todoController(app, bodyParser);

app.listen(3000);

console.log("Application is listening on port 3000");