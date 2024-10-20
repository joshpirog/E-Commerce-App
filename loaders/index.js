const routeLoader = require('../routes');
const expressLoader = require('./express');
const passportLoader = require('./passport');

module.exports = async (app) => {

    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);

    // Error Handler
    app.use((err, req, res, next) => {

        const { message, status } = err;
    
        return res.status(status).send({ message });
    });
}