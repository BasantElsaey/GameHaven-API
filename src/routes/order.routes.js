const express = require("express");
const orderController = require('../controllers/order.controller');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

const orderRouter = express.Router();

orderRouter.use(authenticate);

orderRouter.post("/",restrictTo('user'), orderController.placeOrderController);

orderRouter.get("/", restrictTo('user'),orderController.getUserOrdersController);

orderRouter.put("/:orderId/status", restrictTo('user'),orderController.updateOrderStatusController);

orderRouter.delete("/:orderId", restrictTo('user'),orderController.cancelOrderController);  

module.exports = orderRouter;
