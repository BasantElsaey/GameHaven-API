// const request = require('supertest');
// const app = require('../app'); 
// require('./setup');
// const Wishlist = require('../src/models/Wishlist.model');

// describe('Wishlist Routes', () => {
//   describe('POST /api/wishlist', () => {
//     it('should add game to wishlist', async () => {
//       const game = await require('../src/models/Game.model').create({
//         title: 'Test Game',
//         price: 29.99,
//       });
//       const res = await request(app)
//         .post('/api/wishlist')
//         .send({ gameId: game._id })
//         .expect(201);
//       expect(res.body).toHaveProperty('gameId', game._id.toString());
//     });

//     it('should return 400 for invalid data', async () => {
//       const res = await request(app)
//         .post('/api/wishlist')
//         .send({})
//         .expect(400);
//       expect(res.body).toHaveProperty('errors');
//     });
//   });

//   describe('GET /api/wishlist', () => {
//     it('should get wishlist items', async () => {
//       const res = await request(app)
//         .get('/api/wishlist')
//         .expect(200);
//       expect(res.body).toHaveProperty('items');
//     });
//   });
// });