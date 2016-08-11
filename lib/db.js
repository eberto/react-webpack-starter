var faker = require("faker");
var _ = require("lodash");

var clients = _.times(100, function(i) {
    var birthDate = faker.date.past();
    return {
        id: i+1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        identification: faker.random.number({ min: 1756830399, max: 9999999999 }),
        birthDate: birthDate,
        address: faker.address.streetAddress(),
        phone1: faker.random.number({ min: 6008151, max: 9999999}),
        phone2: faker.random.number({ min: 6008151, max: 9999999}),
        mobilePhone: faker.random.number({ min: 987348876, max: 999999999}),
        email: faker.internet.email(),
        age: faker.random.number({ min: 10, max: 150 }),
        avatar: faker.internet.avatar()
    }
});

module.exports = function () {
    return {
        clients: clients 
    };
}