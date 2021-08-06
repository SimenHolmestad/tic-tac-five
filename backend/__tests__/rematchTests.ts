import mongoose from 'mongoose';
import supertest from 'supertest';
import app from './../src/app';
import Game from './../src/app/models/game';
import initialGameData from './../src/app/constants/initialGameData';

const request = supertest(app);

describe('rematch tests', () => {
  beforeAll(async () => {
    // Connect to database
    const url = `mongodb://127.0.0.1/rematch-test`;
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

  it('Next game and previous game should be null on new game', async () => {
    const response = await request.post('/api/games')
      	  .send({
            name: 'Test game'
          });

    expect(response.status).toBe(200);
    expect(response.body._id).not.toEqual(undefined);

    const gamesInDatabase = await Game.find();
    expect(gamesInDatabase[0].nextGame).toEqual(null);
    expect(gamesInDatabase[0].previousGame).toEqual(null);
  });

  it('Rematching should not be possible on unfinished game', async () => {
    const game = new Game({
        ...initialGameData,
        name: "The test game",
    });
    await game.save();

    const game_id = game._id;
    const response = await request.post('/api/games/' + game_id + '/rematch').send({});

    expect(response.status).toBe(200);
    expect(response.text).toEqual('Cannot rematch when game is not finished');
  });

  it('Rematching on nonexistent game should throw error', async () => {
    // 24 a's are a valid mongoDB object id
    const response = await request.post('/api/games/' + "aaaaaaaaaaaaaaaaaaaaaaaa" + '/rematch').send({});

    expect(response.status).toBe(404);
    expect(response.text).toBe('The game to rematch did not exist');
  });

  it('Rematch should create new game', async () => {
    const finishedGame = new Game({
        ...initialGameData,
        name: "The test game",
        winningLine: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
    });
    await finishedGame.save();

    const game_id = finishedGame._id;
    const response = await request.post('/api/games/' + game_id + '/rematch').send({});

    const rematchGame = response.body
    expect(rematchGame._id).not.toBe(String(game_id));
  });

  it('Rematch should add correct nextGame field to previous game', async () => {
    const finishedGame = new Game({
        ...initialGameData,
        name: "The test game",
        winningLine: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
    });
    await finishedGame.save();

    const game_id = finishedGame._id;
    await request.post('/api/games/' + game_id + '/rematch').send({});

    const updatedFinishedGame = await Game.findById(game_id)

    expect(updatedFinishedGame.nextGame).not.toBe(null);
  });

  it('Rematch game should have correct previous game id', async () => {
    const finishedGame = new Game({
        ...initialGameData,
        name: "The test game",
        winningLine: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
    });
    await finishedGame.save();

    const game_id = finishedGame._id;
    const response = await request.post('/api/games/' + game_id + '/rematch').send({});

    const rematchGame = response.body
    expect(rematchGame.previousGame).toBe(String(game_id));
  });

});
