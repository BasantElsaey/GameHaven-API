const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/', authenticate, wishlistController.addToWishlist);
router.delete('/:gameId', authenticate, wishlistController.removeFromWishlist);
router.get('/', authenticate, wishlistController.getWishlist);

module.exports = router;