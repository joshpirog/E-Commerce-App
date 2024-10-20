const productRouter = require('./product');
const authRouter = require('./auth');
const userRouter = require('./user');
const orderRouter = require('./order');

module.exports = async (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    productRouter(app);
    orderRouter(app);
    
}