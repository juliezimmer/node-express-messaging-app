//server file
//always require express if using it.
var express = require('express');

//add body-parser
var bodyParser = require('body-parser');

//define a variable, app, that is an instance of express:
var app = express();

/*http server set up required for socket.io.
  The http library from node is required.  
  .Server is called on the require('http') with the express app is passed in as a parameter.  */
var http = require('http').Server(app);

//sockets.io must be required to be used.
//reference to http must be part of the io variable.
//socket.io must also be set-up on the front-end.
var io = require('socket.io')(http);

//require mongoose
var mongoose = require('mongoose');

//chaining will be used to tell the express app what to do. 

// ********* app.use ******** //
//.use is another method of the express object that serves static files.
//It also invokes midddleware.
//the first parameter is expresss.static(), which is really a function.
//(__dirname) is passed into the express.static() function.
//express.static is a built-in middleware function of express.
//express.static(root[options])
//root specifies the root directory from which to serve static assets.
//The file served is:req.url + root directory.
//The options object has several different choices.  
app.use(express.static(__dirname));

//body-parser needs to be set up with middleware so it can be used.
//This tells bodyParser that JSON will be coming in with http requests. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//require promise library
//This tells mongoose to use the default es6 promise library.
mongoose.Promise = Promise; 


//connection to mongo/mLab
var dbUrl = 'mongodb://user:user@ds111496.mlab.com:11496/learning-node-message-app';

var Message = mongoose.model('Message', {
    name: String,
    message: String
  });
  
// ********* app.get ********* //
//This specifies that the server is handling "get" requests.
//app.get is a method of the express object.
//The first parameter is the route being used for the get request.
//The second parameter is a callback function to handle the request.
//The callback function takes in two parameters of req and res.
app.get('/messages', (req,res) => {   
    Message.find({}, (err, messages) => {  
    res.send(messages); 
  })
});

app.post('/messages', async (req,res) => {
  var message = new Message(req.body);
  
  //saves messages to DB
  var savedMessage = await message.save();
    console.log("The message has been saved");

  //checks for identified bad/censored words
  var censored = await Message.findOne({message: 'badword'});
    if(censored) {
        await Message.remove({_id: censored.id});
    } else {
        io.emit('message', req.body);
        res.sendStatus(200);
    }
   
    
  // })
  // .catch((err) => {
  //   res.sendStatus(500);
  //   return console.error(err);
  
});

/*This is the callback function that checks for connections   of other   users.
  The function takes in a socket and has an anonymous callback function. */
io.on('connection', (socket) => {
  console.log("A user connected");
});

//connect to mongoose with the connect method. 
//The 1st parameter is the dbURL.
//The 2nd parameter is an object that sets useMongoCLient to true.  
//3rd parameter is a callback function that takes err as parameter. 
mongoose.connect(dbUrl, {useMongoClient : true}, (err) => {
    console.log("MongoDB is connected", err);
});

// ********** app.listen ********** //
/* This code tells the express app to listen for requests on a            specific port.
  .listen is a method of the express object that has two parameters.
  The 1st parameter is the port number.
  The 2nd parameter is a callback function.
  The callback function is anonymous so,  it takes no parameters. 
  The port should be a variable and shouldn't be hard-coded.  
  To use a variable for the port, app.listen should be set to a variable, server.
  server.address() is an object, so if it's used in the console.log as a variable, the entire object will be in the console.log statement. 
  server.address = {
    address: "::",
    family: "IPv6",
    port: 3000
  }.
  To see what port the app is using, console.log: server.address().port in the console.log. 
  Because socket.io is being used in this project, app.listen is being replaced with http.listen. 
  When socket.io was added, an http server was required, changing what specific component is doing the listening. */ 
var server = http.listen(3000, () => {
    console.log("The server is up and running on port: ", server.address().port);
});


