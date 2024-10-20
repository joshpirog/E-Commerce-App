const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');

module.exports = (app) => {

    app.use('/orders', router);

    router.get('/', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await OrderModel.findByUser(id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:orderId', async (req, res, next) => {
        try {
          const { orderId } = req.params;
      
          const response = await OrderModel.findById(orderId);
          res.status(200).send(response);
        } catch(err) {
          next(err);
        }
    
    
      });
}