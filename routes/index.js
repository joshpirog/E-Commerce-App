const productRouter = require('./product');
const authRouter = require('./auth');
const userRouter = require('./user');

module.exports = async (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    productRouter(app);
    
}