const express = require('express');
const wishlistRoutes = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
} = require('../controllers/wishlist.controller');

wishlistRoutes.post('/',authenticate, addToWishlist);
wishlistRoutes.delete('/:gameId',authenticate, removeFromWishlist);
wishlistRoutes.get('/',authenticate, getWishlist);

module.exports = wishlistRoutes;