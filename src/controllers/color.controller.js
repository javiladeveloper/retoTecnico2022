
const generalFunctions = require('../utils/generalFunctions')
const ExceptionError = require('../utils/exception.error');
const { inputValidator } = require('../utils/input.validator');
const { postCreateColor, findColor, listColor } = require('../services/colors.service');
const create = async (body) => {
    const inputValidation = inputValidator(body, create.name);
    if (inputValidation.error) {
        console.error('inputValidation error', inputValidation.error);
        throw new ExceptionError(422, JSON.stringify(inputValidation.error));
    }
    try {
        let response = await postCreateColor(body)
        return { response: response }
    } catch (error) {
        console.error('Something went wrong!', error);
        throw new ExceptionError(500, JSON.stringify(error));
    }
}
const list = async (request) => {
    const inputValidation = inputValidator(request, list.name);
    if (inputValidation.error) {
        console.error('inputValidation error', inputValidation.error);
        throw new ExceptionError(422, JSON.stringify(inputValidation.error));
    }
    try {
        let page = request.page - 1
        const { limit, offset } = generalFunctions.getPagination(page, parseInt(process.env.size_page));
        const orderBy = request.orderBy || "id";
        const sort = request.sort || "asc";
        const id = (request.id) ? ({ "id": request.id }) : 1;
        const name = (request.name) ? (`${request.name}%`) : '%';
        const year = (request.year) ? ({ "year": request.year }) : 1;
        const color = (request.color) ? (`${request.color}%`) : '%';
        const pantone_value = (request.pantone_value) ? (`${request.pantone_value}%`) : '%';
        let resultDb = await listColor(limit, offset, orderBy, sort, id, name, year, color, pantone_value)
        page++
        const response = generalFunctions.getPagingData(resultDb, page, limit);
        let pagination = {
            totalItems: response.totalItems,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            totalDataPerPage: response.totalDataPerPage
        }
        return {
            data: resultDb.rows,
            pagination: pagination
        }

    } catch (error) {
        console.error('Something went wrong!', error);
        throw new ExceptionError(500, JSON.stringify(error));
    }

}
const find = async (request) => {
    const inputValidation = inputValidator(request, find.name);
    if (inputValidation.error) {
        console.error('inputValidation error', inputValidation.error);
        throw new ExceptionError(422, JSON.stringify(inputValidation.error));
    }
    try {

        let resultDb = await findColor(request)
        if (resultDb == null) return { data: "Color doesn't exist" }
        return { data: resultDb }

    } catch (error) {
        console.error('Something went wrong!', error);
        throw new ExceptionError(500, JSON.stringify(error));
    }

}

module.exports = {
    create,
    list,
    find
}

