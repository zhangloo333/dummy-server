const jsonServer = require('json-server');
const _ = require('underscore');
const path = require('path');
const dbpath = path.join(__dirname, 'db-1514784248487.json');
const db = require(dbpath);

const faker = require("faker");
// const _ = require('lodash');
const stTypes = ['READ','WRITE'];

const server = jsonServer.create();
const router = jsonServer.router(dbpath);

const middlewares = jsonServer.defaults();
const addTableItem = (ldap) => {
  return {
    tableItem:{
      userName: ldap,
      name: faker.name.findName(),
      idType: 'USER',
      source:`${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}`.toUpperCase(),
      modifiedTime: faker.date.past(),
      ownerShip: 'DataOwner'
    }
  }
}

server.use(middlewares);

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  if(req.method === 'GET') {
    const queryParams = req.query;
    if(queryParams.hasOwnProperty('LDAP')){
      let checkUserList = [];
      const userName = queryParams.LDAP.split('@')[0];
      const string = `urn:li:userPrincipal:${userName}`;

      // change db.elements to res.locals.data
      console.log('local data',res.locals.data);

      checkUserList = _.filter(db.elements,function(e){
        return e.principal === string;
      });

      if(checkUserList.length > 0){
          res.jsonp({
            hasAccess:true,
            elements:res.locals.data
          })
      } else {
            res.jsonp({
              hasAccess:false,
              elements:res.locals.data
          })
      }
    } else {
      res.jsonp(res.locals.data);
    }
  }

// for post request
if(req.method === 'POST') {
  // const body = req.body;
  // if(body.isApproved){
  //   res.jsonp()
  // }
  // const isApproved = body.businessJustification.toLowerCase().includes('read');
  // if(body.hasOwnProperty('businessJustification') && isApproved){
  //   const lada = _.last(body.principal.split(':'));
  //   res.jsonp({...req.body,accessTypes: "READ", ...addTableItem(lada)})
  // } else {
  //   res.status(401).send(
  //     {
  //       isApproved: false
  //     }
  //   );
  // }
}
}



// server.get('/elements',(req,res,next) => {
//   next();
// })


server.post('/elements',(req, res, next) => {
    const body = req.body;
    const isApproved = body.businessJustification.toLowerCase().includes('read');
    if(body.hasOwnProperty('businessJustification') && isApproved){
      const lada = _.last(body.principal.split(':'));
      req.body = {...req.body,accessTypes: "READ", ...addTableItem(lada)};
      res.jsonp(req.body);
    } else {
      res.status(401).send(
        {
          isApproved: false
        }
      );
    }
  // Continue to JSON Server router
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000/')
})
