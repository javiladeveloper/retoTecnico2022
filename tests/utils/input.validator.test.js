const test = require('ava');
const Util = require('../../src/utils/input.validator');

test.serial('should return list colors', async t => {
    const inputObj = {
        "id": 3,
        "name": "granate",
        "year": 2022,
        "color": "#32532525",
        "pantone_value": "245134213",
        "page": 2
    };
    const inputValidation = Util.inputValidator(inputObj, "list");

    t.pass(inputValidation)
});

test.serial('should return find colors', async t => {
    const inputObj = {
        "id": 3
    };
    const inputValidation = Util.inputValidator(inputObj, "find");

    t.pass(inputValidation)
});

test.serial('should return create colors', async t => {
    const inputObj = {
        "name": "granate",
        "year": 2022,
        "color": "#32532525",
        "pantone_value": "245134213"
    };
    const inputValidation = Util.inputValidator(inputObj, "create");

    t.pass(inputValidation)
});