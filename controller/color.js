require('dotenv').config()
const Color = require("../models").colors;

module.exports = {
    async create(req, res) {

    },
    list(req, res) {
        const limit = parseInt(req.query.limit) || null;
        const orderBy = req.query.orderBy || "id";
        const sort = req.query.sort || "asc";
        return Color.findAll({
            limit: limit,
            order: [
                [orderBy, sort],
            ]
        })
            .then(colors => res.status(200).send(colors))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return Color.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(colors => res.status(200).send(colors))
            .catch(error => res.status(400).send(error))
    },
    async update(req, res) {
    },
    async delete(req, res) {
    },
};

