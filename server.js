//server file
//always require express if using it.
var express = require('express');

//define a variable, app, that is an instance of express:
var app = express();

//chaining will be used as the express app is told what to do.

//.use is another method of the express object that server static files.
//the first parameter is expresss.static(), which is really a function.
//(__dirname) is passed into the express.static() function.
//express.static is a built-in middleware function of express.
//express.static(root[options])
//root specifies the root directory from which to serve static assets.
//The file served is:req.url + root directory.
//The options object has several different choices.  
app.use(express.static(__dirname));
//If the server is started again, hello will be in the broswer.

//This code tells the express app to listen for requests on port 3000.
/*.listen is a method of the express object that takes a port as the first parameter.
  3000 is the port where this app will run. 
  app.listen takes a callback function as the 2nd parameter.
  The callback function is anonymous so, takes no parameters. 
  The port should be a variable because it could change once the app is deployed.  
  It shouldn't be hardcoded. 
  To use a variable for the port, app.listen should be set to a variable, server.
  server.address() is an object, so if it's used in the console.log as a variable, the entire object will be in the console.log statement. 
  server.address = {
    address: "::",
    family: "IPv6",
    port: 3000
  }.
  To just get the port, use: server.address().port in the console.log. */ 
var server = app.listen(3000, () => {
    console.log("The server is up and running on port: ", server.address().port);
});


