const test = require('ava');
const general = require('../../utils/generalFunctions');
const validator = require('../../utils/input.validator');
test.serial('should return list colors', async t => {
    const inputObj = {
        "id": 3,
        "name": "granate",
        "year": 2022,
        "color": "#32532525",
        "pantone_value": "245134213",
        "page": 2
    };
    const inputValidation = validator.inputValidator(inputObj, "list");

    t.pass(inputValidation)
});

test.serial('should return find colors', async t => {
    const inputObj = {
        "id": 3
    };
    const inputValidation = validator.inputValidator(inputObj, "find");

    t.pass(inputValidation)
});

test.serial('should return create colors', async t => {
    const inputObj = {
        "name": "granate",
        "year": 2022,
        "color": "#32532525",
        "pantone_value": "245134213"
    };
    const inputValidation = validator.inputValidator(inputObj, "create");

    t.pass(inputValidation)
});

test.serial('should return pagination', async t => {
    const expect = {
        limit:4,
        offset:4
    };
    const values = {
        page:1,
        size:4
    }
    const {limit, offset} = general.getPagination(values.page, values.size);
    t.deepEqual(expect.limit, limit);
    t.deepEqual(expect.offset, offset);
});

test.serial('should return pagination with out size', async t => {
    const expect = {
        limit:4,
        offset:4
    };
    const values = {
        page:1,
        size:undefined
    }
    const {limit, offset} = general.getPagination(values.page, values.size);
    t.deepEqual(expect.limit, limit);
    t.deepEqual(expect.offset, offset);
});


test.serial('should return pagination data', async t => {
    const expect = {
        totalItems: 14,
        items: [
          { id: 1, name: 'cerulean', color: '#98B2D1' },
          { id: 2, name: 'fuchsia rose', color: '#C74375' },
          { id: 3, name: 'true red', color: '#BF1932' },
          { id: 4, name: 'aqua sky', color: '#7BC4C4' }
        ],
        totalPages: 4,
        currentPage: 1,
        totalDataPerPage: 4
      }
    const values = {
        data:{
            count: 14,
            rows: [
              { id: 1, name: 'cerulean', color: '#98B2D1' },
              { id: 2, name: 'fuchsia rose', color: '#C74375' },
              { id: 3, name: 'true red', color: '#BF1932' },
              { id: 4, name: 'aqua sky', color: '#7BC4C4' }
            ]
          },
          page:1,
          limit:4
    }
    const response = general.getPagingData(values.data, values.page,values.limit);
    t.deepEqual(response, expect);
});