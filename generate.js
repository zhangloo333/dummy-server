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
