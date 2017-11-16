
$(() => {

      $("#send").click(() => {
        addMessages({ name: "Tim", message: "Hello" });
      })
  })

// add messages function
//It takes a parameter of a message object
//This should add the object in the first function parameter to the DOM.
function addMessages(message) {
    $("#messages").append(`<h4> ${message.name} </h4> 
          <p> ${message.message} </p>`);
};
