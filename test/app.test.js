const assert = require('chai').assert;
// const routing = require('../api-routes');
const userController = require('../user-controller');
const userSchema = require('./schema/userSchema');


describe('Testing API1', () => {
    it('getUsers should return', () => {
        let result = userController.getAll();
        let parseResult = result.stringify()
        let expected = userSchema.userSchema;
        let parseExpected = expected.stringify();
        console.log(result);
        console.log(expected);
        console.log(parseResult);
        console.log(parseExpected);
        assert.equal(parseResult,parseExpected);
    })
})