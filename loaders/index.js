const routeLoader = require('../routes');
const expressLoader = require('./express');

module.exports = async (app) => {

    await expressLoader(app);
    await routeLoader(app);
}