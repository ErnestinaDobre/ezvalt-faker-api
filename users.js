const faker = require('faker');
const http = require('http');
const cors = require('http-cors');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;



http.createServer((req, res) => {
  if (cors(req, res)) return
  res.writeHead(200, {
    'Content-type': 'application/json'
  });
  let user;
  let usersArray = [];
  let todos = [];
  for (let i = 1; i < 11; i++) {
    user = {
      'name': faker.name.firstName() + ' ' + faker.name.lastName(),
      'username': faker.random.alphaNumeric(3),
      'email': faker.internet.email(),
      'jobTitle': faker.name.title(),
      'id': i
    }





    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
      todos.push({
        'userId': i,
        'todo': lorem.generateParagraphs(1)
      });
    }

    usersArray.push(user);

  }


  res.end(JSON.stringify(
    { 
      'users' : usersArray,
      'todos' : todos
  }
  ));
}).listen(1337, "127.0.0.1");