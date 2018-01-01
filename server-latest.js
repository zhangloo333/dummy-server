const jsonServer = require('json-server');
const _ = require('underscore');
const path = require('path')
const db = require('./db-1514743751548.json');


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db-1514743751548.json'))

// router.render = (req, res) => {
// if(res.locals.data.length > 0){
//   console.log('cunzai', res.locals.data,' length=',res.locals.data.length);
//   res.jsonp({
//     hasAccess:true,
//     body:db.elements
//   })
// } else{
//     res.jsonp({
//       hasAccess:false,
//       body:db.elements
//   });
// }
// }


const middlewares = jsonServer.defaults();
const approved = (ldap) => {
  return {
    accessTypes: "READ",
    principal:"urn:li:userPrincipal:Arvid42",
    businessJustification:`grandfathered in ${ldap}`,
    aclList: [
      {
        userName: ldap,
        name: "Samara Renner",
        idType: "USER",
        source: "BT",
        modifiedTime: "2017-01-01T22:20:58.278Z",
        ownerShip: "DataOwner"
      }
    ]
  }
}

server.use(middlewares);

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.get('/elements',(req,res,next) => {
  const queryParams = req.query;
  if(queryParams.hasOwnProperty('LDAP')){
    console.log('queryParams', queryParams);
    let checkUserList = [];
    const userName = queryParams.LDAP.split('@')[0];
    console.log('userName',userName);

    const string = `urn:li:userPrincipal:${userName}`;
    console.log('string',string);

    checkUserList = _.filter(db.elements,function(e){
      return e.principal === string;
    });

    console.log('checkUserList',checkUserList);



    if(checkUserList.length > 0){
        res.jsonp({
          hasAccess:true,
          body:db.elements
        })
    } else {
          res.jsonp({
            hasAccess:false,
            body:db.elements
        })
    }
  } else {
    next();
  }
})


server.post('/elements',(req, res, next) => {
    const body = req.body;
    const isApproved = body.businessJustification.toLowerCase().includes('read');
    if(body.hasOwnProperty('businessJustification') && isApproved){
      req.body = {...req.body, ...approved(req.body.LDAP)};
      next();
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
