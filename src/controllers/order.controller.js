const { body, param, validationResult } = require('express-validator');
const orderService = require('../services/order.service');

// Place Order
const placeOrder = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const order = await orderService.createOrder(req.user._id);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },
];

// Get User Orders
const getUserOrders = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const orders = await orderService.getOrdersByUser(req.user._id);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  },
];

// Update Order Status
const updateOrderStatus = [
  param('orderId').isMongoId().withMessage('Invalid order ID'),
  body('status').notEmpty().withMessage('Status is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(req.params.orderId, req.body.status);
      res.status(200).json(updatedOrder);
    } catch (err) {
      next(err);
    }
  },
];

// Cancel Order
const cancelOrder = [
  param('orderId').isMongoId().withMessage('Invalid order ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const cancelledOrder = await orderService.updateOrderStatus(req.params.orderId, 'cancelled');
      res.status(200).json(cancelledOrder);
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
};