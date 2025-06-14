const { param, body, validationResult } = require('express-validator');
const wishlistService = require('../services/wishlist.service');

const addToWishlist = [
  body('gameId').isMongoId().withMessage('Invalid game ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const result = await wishlistService.addToWishlist(req.user._id, req.body.gameId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
];

const removeFromWishlist = [
  param('gameId').isMongoId().withMessage('Invalid game ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const result = await wishlistService.removeFromWishlist(req.user._id, req.params.gameId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
];

const getWishlist = [
  async (req, res, next) => {
    try {
      const result = await wishlistService.getWishlist(req.user._id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
];

module.exports = { addToWishlist, removeFromWishlist, getWishlist };