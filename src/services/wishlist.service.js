const Wishlist = require('../models/Wishlist.model');
const Game = require('../models/Game.model');

exports.addToWishlist = async (userId, gameId) => {
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, games: [gameId] });
    } else {
        if (!wishlist.games.includes(gameId)) {
        wishlist.games.push(gameId);
        await wishlist.save();
        }
    }
    return wishlist;
    };

    exports.removeFromWishlist = async (userId, gameId) => {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) throw new Error('Wishlist not found');

    wishlist.games = wishlist.games.filter(
        (id) => id.toString() !== gameId.toString()
    );
    await wishlist.save();
    return wishlist;
    };

    exports.getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('games');
    return wishlist || { user: userId, games: [] };
};
