const routeLoader = require('../routes');
const expressLoader = require('./express');
const passportLoader = require('./passport');

module.exports = async (app) => {

    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);
}