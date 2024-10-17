const productRouter = require('./product');

module.exports = (app, passport) => {
    productRouter(app);
}