'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./router/router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/midProject');
dotenv.load();

require('./lib/storage.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', routes);//Used AFTER body-parser stuff

app.use((request, response) => {
  //have the server send back something
  response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  response.write('Testing Basic Server Response');//test response
  response.end();//test response
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});