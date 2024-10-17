const createError = require('http-errors');
const express = require('express');
const router = express.Router();

// const ProductService = require('../services/ProductService');
// const ProductServiceInstance = new ProductService();

const ProductModel = require('../models/product');

module.exports = (app) => {

    app.use('/products', router);

    router.get('/', async (req, res, next) => {
        try {
    
          const queryParams = req.query;
    
          const response = await ProductModel.find(queryParams);
          res.status(200).send(response);
        } catch(err) {
          next(err);
        }
      });
    
      router.get('/:productId', async (req, res, next) => {
        try {
          const { productId } = req.params;
    
          const response = await ProductModel.findOne(productId);
          
          if (!response) {
            throw createError(404, 'Product not found');
          }

          res.status(200).send(response);
        } catch(err) {
          next(err);
        }
      });

      router.post('/', async (req, res, next) => {
        try {
            const data = req.body;

            const response = await ProductModel.create(data)

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
      })
}