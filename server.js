const jsonServer = require('json-server');
const path = require('path')
const db = require('./db-latest.json');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db-latest.json'))
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
server.use(jsonServer.bodyParser)
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
