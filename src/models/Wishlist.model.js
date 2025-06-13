const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
