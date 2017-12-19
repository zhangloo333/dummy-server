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
