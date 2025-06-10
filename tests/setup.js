const { connectDB, disconnectDB } = require('../src/config/db');
const mongoose = require('mongoose');

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; 
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
  process.env.NODE_ENV = 'development'; 
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});