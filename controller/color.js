const Sequelize = require("sequelize");
const Color = require("../src/models").colors;
const generalFunctions = require('../src/utils/generalFunctions')

module.exports = {
    async create(req, res) {
        try {
            let body = req.body
            if (!body.name) return res.status(500).send("Not Found Name")
            if (!body.year) return res.status(500).send("Not Found Year")
            if (!body.color) return res.status(500).send("Not Found Color")
            if (!body.pantone_value) return res.status(500).send("Not Found Pantone value")
            await Color.create({
                name: body.name,
                year: body.year,
                color: body.color,
                pantone_value: body.pantone_value
            })
            res.status(200).send({ response: "Created Color" })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async list(req, res) {
        try {
            let params = req.query
            let page = params.page - 1
            const { limit, offset } = generalFunctions.getPagination(page, parseInt(process.env.size_page));
            const orderBy = params.orderBy || "id";
            const sort = params.sort || "asc";
            const id = (params.id) ? ({ "id": params.id }) : 1;
            const name = (params.name) ? (`${params.name}%`) : '%';
            const year = (params.year) ? ({ "year": params.year }) : 1;
            const color = (params.color) ? (`${params.color}%`) : '%';
            const pantone_value = (params.pantone_value) ? (`${params.pantone_value}%`) : '%';
            let resultDb = await Color.findAndCountAll({
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
            page++
            const response = generalFunctions.getPagingData(resultDb, page, limit);
            let pagination = {
                totalItems: response.totalItems,
                totalPages: response.totalPages,
                currentPage: response.currentPage,
                totalDataPerPage: response.totalDataPerPage
            }
            res.status(200).send({ data: resultDb.rows, pagination: pagination })
        } catch (error) {
            res.status(400).send(error)
        }

    },
    async find(req, res) {
        try {
            let resultDb = await Color.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({ data: resultDb })

        } catch (error) {
            res.status(400).send(error)
        }

    },
    async update(req, res) {
    },
    async delete(req, res) {
    },
};

