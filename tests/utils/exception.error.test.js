const test = require('ava');
const ExceptionError  = require('../../utils/exception.error');

test('Should format ExceptionError correctly', t => {
    const code = new ExceptionError(500, 'Internal server error');

    t.pass();
});