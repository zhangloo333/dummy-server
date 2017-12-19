# how to user dummy server

## install steps
1. npm init
2. npm install --save json-server
3. touch db.json to save out JSON data
4. add data in db.json
  ```JSON

  {
    "people":[
      {
        "id": 0,
        "name": "Jason"
      }
    ]
  }
```
  5. run json server:
    - run “./node_modules/.bin/json-server db.json” in termianl
    - or npm run server, but you should set scripts in package.JSON
    <br>

```JSON
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "server": "./node_modules/.bin/json-server db.json"
    },
```

## how to make post request
    - user postman do POST request:
      [POST] http://localhost:3000/people
      [Header] Content-Type:application/json
      [Body]
      ``` JSON
      {
      	"name":"herry"
      }
      ```
    - GET request to check the result
      [GET] http://localhost:3000/people


    - PUT request:
      [PUT] http://localhost:3000/people/2
      ```JSON
      [body-raw-JSON]
          {"name": "YI"}
      Response:
        {
          "name": "YI",
          "id": 2
        }
      ```
    - How to save you change
    type 's' in the terminal, it will take snapshot for the changes

## how to faker the Data
1. create a new file generate.js
```javascript
// for generate the data
module.exports = function() {
  return {}
}
```
2. install package 'npm install --save faker lodash'
3. import package faker and lodash to generate dummy data in generate.js
```javascript

const faker = require("faker");
const _ = require('lodash');

module.exports = function() {
  return {
    people: _.times(20, function(n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
      }
    })
  }
}

```
