const ServiceError = require('../utils/exception.error');
const Color = require("../models").colors;
const Sequelize = require('sequelize')
const createColor = async (body) => {
    await Color.create({
        name: body.name,
        year: body.year,
        color: body.color,
        pantone_value: body.pantone_value
    })
    return "Created Color"

}
const findColor = async (request) => {
    try {
        let response = await Color.findOne({
            raw: true,
            where: {
                id: request.id
            }
        })
        return response
    } catch (error) {
        throw new ServiceError(500, 'Mysql query error ocurred: colors');
    }
}
const listColor = async (limit, offset, orderBy, sort, id, name, year, color, pantone_value) => {
    try {
        let response = await Color.findAndCountAll({
            raw: true,
            attributes: ["id", "name", "color"],
            limit,
            offset,
            where: {
                [Sequelize.Op.and]: [
                    id, year
                ],
                name: {
                    [Sequelize.Op.like]: name
                },
                color: {
                    [Sequelize.Op.like]: color
                },
                pantone_value: {
                    [Sequelize.Op.like]: pantone_value
                }
            },
            order: [
                [orderBy, sort],
            ]
        })
        return response
    } catch (error) {
        console.log(error)
        throw new ServiceError(500, 'Mysql query error ocurred: colors');
    }
}

module.exports = {
    createColor,
    listColor,
    findColor
}