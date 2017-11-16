/*initializing socket.io
  initialization tries to make connection to Socket.io server at the same URL that the current page is being hosted on. 
  a callback function needs to be set up for the connection event that alerts the user whenever a new user connects. This is done in the server.js file. */
var socket = io();

$(() => {

      $("#send").click(() => {
        var message = {
            name: $("#name").val(),
            message: $("#message").val()
        };
        postMessages(message);
        })
      getMessages();
    });

// add messages function
//It takes a parameter of a message object
//This should add the object in the first function parameter to the DOM.
function addMessages(message) {
    $("#messages").append(`<h4> ${message.name} </h4> 
          <p> ${message.message} </p>`);
  };

  /*This function will get the messages from the server.js file and post    all previous (not new messages) messages on the DOM.
    This is an AJAX request. 
    The callback function in the .get request has a callback function that takes in data that is being fetched as a parameter. */
  function getMessages() { 
      $.get('http://localhost:3000/messages', (data) => {
          //This populeate the DOM with the message history in a for each loop. 
          data.forEach(addMessages);
          });
      };
  function postMessages(message) { 
      $.post('http://localhost:3000/messages', message)
       };
  
