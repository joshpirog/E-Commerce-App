const express = require('express');
const router = express.Router();

const CartModel = require('../models/cart');
const OrderModel = require('../models/order');
const CartItemModel = require('../models/cartItem');
//const CartService = require('../services/CartService');

//const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

  app.use('/api/carts', router);

  router.get('/mine', async (req, res, next) => {
    try {
      const { id } = req.user;
      
      const cart = await CartModel.findOneByUser(id);

      // Load cart items and add them to the cart record
      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      res.status(200).send(cart);

    } catch(err) {
      next(err);
    }
  });

  // router.put('/mine', async (req, res, next) => {
  //   try {
  //     const { id } = req.user;
    
  //     const response = await CartServiceInstance.get({ id });
  //     res.status(200).send(response);
  //   } catch(err) {
  //     next(err);
  //   }
  // });

  router.post('/mine', async (req, res, next) => {
    try {
      const { id } = req.user;
      
      const Cart = new CartModel();
      const cart = await Cart.create(id);

      res.status(200).send(cart);
    } catch(err) {
      next(err);
    }
  });

  router.post('/mine/items', async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;
      
      // Load user cart based on ID
      const cart = await CartModel.findOneByUser(id);

      // Create cart item
      const cartItem = await CartItemModel.create({ cartId: cart.id, ...data });

      res.status(200).send(cartItem);
    } catch(err) {
      next(err);
    }
  });

  router.put('/mine/items/:cartItemId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;
      
      // Remove cart item by line ID
      const cartItem = await CartItemModel.update(cartItemId, data);

      res.status(200).send(cartItem);
    } catch(err) {
      next(err);
    }
  });

  router.delete('/mine/items/:cartItemId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
    
      const cartItem = await CartItemModel.delete(cartItemId);

      res.status(200).send(cartItem);
    } catch(err) {
      next(err);
    }
  });

  router.post('/mine/checkout', async (req, res, next) => {
    try {
      const { id } = req.user;

      const { cartId, paymentInfo } = req.body; 

      //const stripe = require('stripe')('123456');

      // Load cart items
      const cartItems = await CartItemModel.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        return total += Number(item.price);
      }, 0);

      // Generate initial order
      const Order = new OrderModel({ total, id });
      Order.addItems(cartItems);
      await Order.create();

      // Make charge to payment method (not required in this project)
      const charge = await stripe.charges.create({
        amount: total,
        currency: 'usd',
        source: paymentInfo.id,
        description: 'A Charge'
      });

      // On successful charge to payment method, update order status to COMPLETE
      const order = Order.update({ status: 'COMPLETE' });

      res.status(200).send(order);
    } catch(err) {
      next(err);
    }
  });
}