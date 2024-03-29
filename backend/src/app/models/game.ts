import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: String,
  boardState: Array,
  nextToMove: String,
  history: Array,
  winner: String,
  winningLine: Array,
  timeStarted: { type: Date, default: Date.now },
  lastMoveMade: { type: Date, default: Date.now },
  previousGame: mongoose.Types.ObjectId,
  nextGame: mongoose.Types.ObjectId,
});

export default mongoose.model('Game', GameSchema);
