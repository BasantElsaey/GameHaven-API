const wishlistService = require('../services/wishlist.service');

exports.addToWishlist = async (req, res, next) => {
    try {
        const result = await wishlistService.addToWishlist(req.user._id, req.body.gameId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
    };

    exports.removeFromWishlist = async (req, res, next) => {
    try {
        const result = await wishlistService.removeFromWishlist(req.user._id, req.params.gameId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
    };

    exports.getWishlist = async (req, res, next) => {
    try {
        const result = await wishlistService.getWishlist(req.user._id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
