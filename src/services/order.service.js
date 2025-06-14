const Order = require('../models/Order.model');
const Cart = require('../models/Cart.model');
const Game = require('../models/Game.model');

class OrderService {
  async createOrder(user) {
    if (!user) throw new Error('User ID is required');
    
    const cart = await Cart.findOne({ user }).populate('items.gameId', 'price stock');
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty. Cannot create order.');
    }

    for (const item of cart.items) {
      if (item.quantity > item.gameId.stock) {
        throw new Error(`Not enough stock for game: ${item.gameId._id}`);
      }
    }

    const totalPrice = cart.items.reduce((total, item) => {
      const gamePrice = item.gameId.price || 0;
      return total + gamePrice * item.quantity;
    }, 0);

    const order = new Order({
      user,
      items: cart.items.map(({ gameId, quantity }) => ({
        gameId: gameId._id || gameId,
        quantity
      })),
      total: totalPrice,
      status: 'placed',
    });

    await order.save();

    for (const item of cart.items) {
      const game = await Game.findById(item.gameId._id || item.gameId);
      game.stock -= item.quantity;
      await game.save();
    }

    cart.items = [];
    await cart.save();

    return order;
  }

  async getOrdersByUser(user) {
    if (!user) throw new Error('User ID is required');
    
    const orders = await Order.find({ user }).populate('items.gameId');
    return orders.map(order => ({
      orderId: order._id,
      items: order.items.map(item => ({
        title: item.gameId.title.trim(),
        price: item.gameId.price,
        quantity: item.quantity,
        totalPrice: item.gameId.price * item.quantity
      })),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));
  }

  async updateOrderStatus(orderId, status) {
    if (!orderId) throw new Error('Order ID is required');
    if (!status) throw new Error('Status is required');

    const allowedStatuses = ['placed', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid order status');
    }

    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        const game = await Game.findById(item.gameId._id || item.gameId);
        game.stock += item.quantity;
        await game.save();
      }
    }

    order.status = status;
    await order.save();

    return order;
  }
}

module.exports = new OrderService();