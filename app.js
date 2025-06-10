const express = require('express');
const morgan = require('morgan');
const loggerMiddleware = require('./src/middlewares/logger.middleware');
const errorMiddleware = require('./src/middlewares/error.middleware');
const authRoutes = require('./src/routes/auth.routes');
const gameRoutes = require('./src/routes/game.routes');
const cartRoutes = require('./src/routes/cart.routes');
const reviewRoutes = require('./src/routes/review.routes');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(loggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/games', gameRoutes);

// Error Handler
app.use(errorMiddleware);

module.exports = app;
