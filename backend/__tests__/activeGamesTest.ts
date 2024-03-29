import mongoose from 'mongoose';
import supertest from 'supertest';
import app from './../src/app';
import Game from './../src/app/models/game';
import initialGameData from './../src/app/constants/initialGameData';

const request = supertest(app);

describe('active_games endpoint test', () => {
  beforeAll(async () => {
    // Connect to database
    const url = `mongodb://127.0.0.1/active-games-test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Delete every game in database
    await Game.deleteMany();
  });

  afterAll(async () => {
    // Remove the database
    await mongoose.connection.db.dropDatabase();
    // Close the connection to MongoDB
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Game.deleteMany();
  });

  it('test no games returned', async () => {
    const res = await request.get('/api/active_games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual( [] );
  });

  it('test game returned', async () => {
    const game = new Game(initialGameData);
    await game.save();
    const res = await request.get('/api/active_games');
    expect(res.status).toBe(200);
    expect(res.body).not.toEqual( [] );
    expect(res.body[0].name).toEqual("Untitled game");
  });

  it('test multiple games returned', async () => {
    const game1 = new Game(initialGameData);
    await game1.save();

    const game2 = new Game(initialGameData);
    await game2.save();

    const res = await request.get('/api/active_games');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(2);
  });

  it('test only unfinished games returned', async () => {
    const game1 = new Game(initialGameData);
    await game1.save();

    // game2 should now be considered finished as it has a winner
    const game2 = new Game(initialGameData);
    game2.winner="O";
    await game2.save();

    const res = await request.get('/api/active_games');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(1);
  });

  it('test history not returned', async () => {
    const game = new Game(initialGameData);
    game.history = ["this", "can", "get", "very", "long"];
    await game.save();

    const res = await request.get('/api/active_games');
    expect(res.status).toBe(200);
    expect(res.body[0].history).toEqual(undefined);
  });
});
