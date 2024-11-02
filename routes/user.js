const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const createError = require('http-errors');

module.exports = (app) => {

    app.use('/api/users', router);
  
    router.get('/:userId', async (req, res, next) => {
  
      try {
        const { userId } = req.params;
      
        const response = await UserModel.findOneById(userId);

        // If user doesn't exist, reject
        if (!response) {
            throw createError(404, 'User record not found');
        }
        res.status(200).send(response);
      } catch(err) {
        next(err);
      }
    });
  
    router.put('/:userId', async (req, res, next) => {
      try {
        const { userId } = req.params;
        const data = req.body;
  
        const response = await UserModel.update({ id: userId, ...data });
        res.status(200).send(response);
      } catch(err) {
        next(err);
      }
    });
  
  }