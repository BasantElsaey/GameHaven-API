const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const { connectDB } = require('./src/config/db');
const env = require('./src/config/env');
const errorMiddleware = require('./src/middlewares/error.middleware');
const loggerMiddleware = require('./src/middlewares/logger.middleware');
const authRoutes = require('./src/routes/auth.routes');
const gameRoutes = require('./src/routes/game.routes');
const cartRoutes = require('./src/routes/cart.routes');
const orderRoutes = require('./src/routes/order.routes');
const reviewRoutes = require('./src/routes/review.routes');
const categoryRoutes = require('./src/routes/category.routes');
const wishlistRoutes = require('./src/routes/wishlist.routes');
const { upload } = require('./src/utils/uploadConfig'); 

const app = express();

// Load Swagger YAML
const swaggerDocument = yaml.load('./swagger.yaml');

// Middleware
app.use(express.json()); 
app.use(morgan('combined'));
app.use(loggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
// app.use('/api/wishlist', wishlistRoutes);
app.use('/api/games', gameRoutes); 

// Error Handling
app.use(errorMiddleware);
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server
const PORT = env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = app;