const Wishlist = require('../models/Wishlist.model');
const Game = require('../models/Game.model');

class WishlistService {
  async addToWishlist(userId, gameId) {
    if (!userId || !gameId) throw new Error('User ID and Game ID are required');
    const game = await Game.findById(gameId);
    if (!game) throw new Error('Game not found');

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, games: [gameId] });
    } else if (!wishlist.games.includes(gameId)) {
      wishlist.games.push(gameId);
    } else {
      throw new Error('Game already in wishlist');
    }

    await wishlist.save();
    return { message: 'Game added to wishlist', wishlist };
  }

  async removeFromWishlist(userId, gameId) {
    if (!userId || !gameId) throw new Error('User ID and Game ID are required');
    const game = await Game.findById(gameId);
    if (!game) throw new Error('Game not found');

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) throw new Error('Wishlist not found');

    const initialLength = wishlist.games.length;
    wishlist.games = wishlist.games.filter(
      (id) => id.toString() !== gameId.toString()
    );

    if (wishlist.games.length === initialLength) {
      throw new Error('Game not found in wishlist');
    }

    await wishlist.save();
    return { message: 'Game removed from wishlist', wishlist };
  }

  async getWishlist(userId) {
    if (!userId) throw new Error('User ID is required');
    const wishlist = await Wishlist.findOne({ user: userId }).populate('games', 'title price');
    return wishlist ? wishlist.games : [];
  }
}

module.exports = new WishlistService();