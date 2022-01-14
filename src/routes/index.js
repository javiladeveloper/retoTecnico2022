const colorController = require('../controllers/color.controller');
const apiname = '/retoTecnico';
module.exports = (app) => {
  app.get(`${apiname}/colores`, async (request, reply) => {
    try {
      let params = request.query
      let response = await colorController.list(params)
      reply.status(200).send(response);
    } catch (e) {
      return reply.status(e.code).send({
        statusCode: e.code,
        body: e.message
      });
    }

  });
  app.get(`${apiname}/colores/:id`, async (request, reply) => {
    try {
      let params = request.params
      let response = await colorController.find(params)
      reply.status(200).send(response);
    } catch (e) {
      return reply.status(e.code).send({
        statusCode: e.code,
        body: e.message
      });
    }
  });
  app.post(`${apiname}/colores`, async (request, reply) => {
    try {
      let body = request.body
      let response = await colorController.create(body)
      reply.status(200).send(response);
    } catch (e) {
      return reply.status(e.code).send({
        statusCode: e.code,
        body: e.message
      });
    }
  });
};