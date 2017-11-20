//use ES6
//this is the jasmine testing folder
//Create a suite or grouping of tests using "describe".
//describe is a function call that takes the description as the first parameter.
//The 2nd parameter is a callback function (use arrow function).

//request is a library that allows http request in unit tests.
var request = require('request');

describe('calc', () => {
  //in here, describe the first specification or test.
  it('should multiply 2 and 2', () => {
    //describe what the result should be using "expect",
    expect(2*2).toBe(4) //this should be run in the terminal with "npm test"
  })
})

//This test will require a library called request.
//The library allows us to make a get request in the testing unit.
//It needs to be installed with npm.
//It needs to be required in the file at the top.
describe('get messages', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.body) 
      expect(res.statusCode).toEqual(200) 
      done()
    })
  })
  it('should return a list that is not empty', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.body) 
      //res.body is actually a string.
      //JSON.parse must be used to parse res.body.
      //Otherwise, res.body.length will be the number of characters in the body. 
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)  
      done()
    })
  })
})

describe('get messages from user', () => {
  it('should return status 200 ok', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      expect(res.statusCode).toEqual(200) 
      done()
    })
  })
  it('name should be tim', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      /*This tells the test to expect the name in the first element in the array ([0].name) to be tim. */
      expect(JSON.parse(res.body)[0].name).toEqual('tim') 
      done()
    })
  })
})