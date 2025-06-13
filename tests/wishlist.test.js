const supertest = require('supertest');
const app = require('../app');
const User = require('../src/models/User.model');
const Game = require('../src/models/Game.model');
const request = supertest(app);


describe("wishlist controller", () => {
let token=null;
let userId=null;
let gameId=null;

beforeAll(async () => {
    // Create test user
    const user = {
        name: "Mohamed",
        email: `mohamed${Date.now()}@email.com`,
        password: "test123",
    }; 

    await User.create(user);

    // Create test game
        const game = await Game.create({ 
            title: "Test Game", 
            description: "description", 
            genre: "Fantasy", 
            platform: "Steam", 
            price: 100, 
            stock: 10 
        });
        gameId = game._id;

        const logged = await request.post("/api/auth/login").send({ email: user.email, password: user.password });
        userId = logged.body.user._id;
        token = logged.body.token;
    });

        it('Add game to wishlist', async () => {
        const res = await request
        .post("/api/wishlist")
        .send({gameId})
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.games).toContainEqual(gameId.toString());
    });

    it('Get user wishlist', async () => {
        const res = await request
        .get('/api/wishlist')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.games.length).toBeGreaterThan(0);
    });

    it('Remove game from wishlist', async () => {
        const res = await request
        .delete(`/api/wishlist/${gameId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.games).not.toContainEqual(gameId.toString());
    });
});
