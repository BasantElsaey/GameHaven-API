const express = require("express");
const orderController = require('../controllers/order.controller');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

const orderRouter = express.Router();

orderRouter.use(authenticate);

orderRouter.post("/",restrictTo('user'), orderController.placeOrder);

orderRouter.get("/", restrictTo('user'),orderController.getUserOrders);

orderRouter.put("/:orderId/status", restrictTo('user'),orderController.updateOrderStatus);

orderRouter.delete("/:orderId", restrictTo('user'),orderController.cancelOrder);  

module.exports = orderRouter;

