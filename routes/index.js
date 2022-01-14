const colorController = require('../controller/color');
const apiname = '/retoTecnico';
module.exports = (app) => {
  app.get(`${apiname}/color`, colorController.list);
  app.get(`${apiname}/color/:id`, colorController.find);
};