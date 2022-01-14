const test = require('ava');
const colorService = require('../../services/colors.service');
const colorModel = require('../../models').colors;

const repositoryMock = function (method, dataObj) {
    const responseObj = {};
    responseObj[method] = function () {
        return Promise.resolve(dataObj);
    };
    return responseObj;
}
const repositoryErrorMock = function (method, dataObj) {
    const responseObj = {};
    responseObj[method] = function () {
        return Promise.reject(dataObj);
    };
    return responseObj;
}

test.serial('Should look for the list colors with all the functions involved', async t => {
    const mockColors =  {
        "count": 13,
        "rows": [
            {
                "id": 1,
                "name": "cerulean",
                "color": "#98B2D1"
            },
            {
                "id": 2,
                "name": "fuchsia rose",
                "color": "#C74375"
            },
            {
                "id": 3,
                "name": "true red",
                "color": "#BF1932"
            },
            {
                "id": 4,
                "name": "aqua sky",
                "color": "#7BC4C4"
            }
        ]
    }
    const request = {
        "limit":4,
        "offset":0,
        "orderBy":"id", 
        "sort":"asc",
        "id":1, 
        "name":'%', 
        "year":1, 
        "color":'%', 
        "pantone_value":'%'
    }


    colorModel.model = repositoryMock('findAndCountAll', mockColors);
    const listColors = await colorService.listColor(request.limit, request.offset,request.orderBy, request.sort, request.id, request.name, request.year, request.color, request.pantone_value);
    t.deepEqual(mockColors, listColors);
});

test.serial('should throw an not found while fetching tips from mongodb on list colors', async t => {
    const responseObjectError = {
        response: {
            status: 500,
            statusText: 'mongodb query error ocurred'
        }
    };
    const params = {
        "page":1
    }
    colorModel.Model = repositoryErrorMock('findAndCountAll', responseObjectError);

    const error = await t.throwsAsync(() => colorService.listColor(params));
    t.is(error.code, responseObjectError.response.status);
});

test.serial('Should look for the find colors with all the functions involved', async t => {
    const mockColors =  {
            "id": 1,
            "name": "cerulean",
            "year": 2000,
            "color": "#98B2D1",
            "pantone_value": "15-4020"
    }
    const request = {
        "id": 1
    }

    colorModel.model = repositoryMock('findOne', mockColors);
    const findColor = await colorService.findColor(request);
    t.deepEqual(mockColors, findColor);
});

test.serial('should throw an not found while fetching tips from mongodb on find colors', async t => {
    const responseObjectError = {
        response: {
            status: 500,
            statusText: 'mongodb query error ocurred'
        }
    };
    const params = {
        "page":1
    }
    colorModel.Model = repositoryErrorMock('findOne', responseObjectError);

    const error = await t.throwsAsync(() => colorService.findColor(params));
    t.is(error.code, responseObjectError.response.status);
});

test.serial('Should look for the create colors with all the functions involved', async t => {
    const mockColors =  "Created Color"
    const request = {
        "name":"dorado",
        "color":"#542345",
        "year":"2022",
        "pantone_value":"5243232"
    
    }

    colorModel.model = repositoryMock('create', mockColors);
    const createColor = await colorService.createColor(request);
    t.deepEqual(mockColors, createColor);
});
