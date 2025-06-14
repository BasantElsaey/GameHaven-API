// const { body, param } = require('express-validator');
// const validate = require('../middlewares/validation.middleware');
// const orderService = require('../services/order.service');


// // Place Order
// const placeOrderController = [
//   validate,
//   async (req, res, next) => {
//     try {
//       const userId = req.user.id;
//       const order = await orderService.createOrder(userId);
//       res.status(201).json({ data: order, message: "Order placed successfully" });
//     } catch (error) {
//       console.error("Error placing order:", error);
//       next(error);
//     }
//   },
// ];

// // Get User Orders
// const getUserOrdersController = [
//   validate,
//   async (req, res, next) => {
//     try {
//       const userId = req.user.id;
//       const orders = await orderService.getOrdersByUser(userId);
//       res.status(200).json({ data: orders });
//     } catch (error) {
//       console.error("Error fetching user orders:", error);
//       next(error);
//     }
//   },
// ];

// // Update Order Status
// const updateOrderStatusController = [
//   param('orderId').isMongoId().withMessage('Invalid order ID'),
//   body('status').notEmpty().withMessage('Status is required'),
//   validate,
//   async (req, res, next) => {
//     try {
//       const orderId = req.params.orderId;
//       const { status } = req.body;

//       const updatedOrder = await orderService.updateOrderStatus(orderId, status);
//       res.status(200).json({ data: updatedOrder, message: `Order status updated to ${status}` });
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       next(error);
//     }
//   },
// ];


// const cancelOrderController = [
//   param('orderId').isMongoId().withMessage('Invalid order ID'),
//   validate,
//   async (req, res, next) => {
//     try {
//       const orderId = req.params.orderId;
//       const status="cancelled"

//       const cancelledOrder = await orderService.updateOrderStatus(orderId, status);
//       res.status(200).json({ data: cancelledOrder, message: `Order has been cancelled successfully.` });
//     } catch (error) {
//       console.error("Error cancelling order :", error);
//       next(error);
//     }
//   },
// ];

// module.exports = {
//   placeOrderController,
//   getUserOrdersController,
//   updateOrderStatusController,
//   cancelOrderController
// };


const { body, param } = require('express-validator');
const validate = require('../middlewares/validation.middleware');
const orderService = require('../services/order.service');

// Place Order
const placeOrder = [
  validate,
  async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const order = await orderService.createOrder(userId);
      res.status(201).json({ data: order, message: "Order placed successfully" });
    } catch (error) {
      console.error("Error while Placing Order:", error);
      next(error);
    }
  },
];

// Get User Orders
const getUserOrders = [
  validate,
  async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const orders = await orderService.getOrdersByUser(userId);
      res.status(200).json({ data: orders });
    } catch (error) {
      console.error("Error while Fetching User Orders:", error);
      next(error);
    }
  },
];

// Update Order Status
const updateOrderStatus = [
  param('orderId').isMongoId().withMessage('Invalid order ID'),
  body('status').notEmpty().withMessage('Status is required'),
  validate,
  async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json({
        data: updatedOrder,
        message: `Order status updated to ${status}`,
      });
    } catch (error) {
      console.error("Error while Updating Order Status:", error);
      next(error);
    }
  },
];

// Cancel Order
const cancelOrder = [
  param('orderId').isMongoId().withMessage('Invalid order ID'),
  validate,
  async (req, res, next) => {
    const { orderId } = req.params;
    const status = "cancelled";

    try {
      const cancelledOrder = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json({
        data: cancelledOrder,
        message: "Order has been cancelled successfully.",
      });
    } catch (error) {
      console.error("Error while Cancelling Order:", error);
      next(error);
    }
  },
];

module.exports = {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
};
