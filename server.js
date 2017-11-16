//server file
//always require express if using it.
var express = require('express');

//define a variable, app, that is an instance of express:
var app = express();

//chaining will be used as the express app is told what to do.
//This code tells the express app to listen for requests on port 3000.
/*.listen is a method of the express object that takes a port as the first            parameter.
  3000 is the port where this app will run.
   */
app.listen(3000);