var faker = require("faker");
var _ = require("lodash");

var calcAge = function(birthDate) {
    var today = new Date();
    var diff = Math.floor(today.getTime() - birthDate.getTime());
    var day = 1000 * 60 * 60 * 24;
    return Math.floor(diff/day/31/12);
};

var clients = _.times(100, function(i) {
    var birthDate = faker.date.past();
    return {
        id: i+1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        identification: faker.random.uuid(),
        birthDate: birthDate,
        address: faker.address.streetAddress(),
        phone1: faker.phone.phoneNumber(),
        phone2: faker.phone.phoneNumber(),
        mobilePhone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        age: calcAge(birthDate),
        avatar: faker.internet.avatar()
    }
});

module.exports = function () {
    return {
        clients: clients 
    };
}