const faker = require("faker");
const _ = require('lodash');
const stTypes = ['READ','WRITE'];

function getRandomAccessTypes(min=0,max=2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const state = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  var res;
  switch (state) {
    case 0:
      res = stTypes[0];
      break;
    case 1:
      res = stTypes[1];
      break;
    case 2:
      res = stTypes;
      break;
    default:
      res = stTypes[1];
  }
return res;
}

module.exports = function() {
  return {
    elements: _.times(5,function(n) {
      const userName = faker.internet.userName();
      return {
        id: n,
        principal:`urn:li:userPrincipal:${userName}`,
        businessJustification: `grandfathered in ${userName}`,
        accessTypes: getRandomAccessTypes()
      }
    })
  }
}
