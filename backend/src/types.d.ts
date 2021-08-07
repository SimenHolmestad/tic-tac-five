import { ObjectId } from 'mongoose'
type CellState = "-" | "X" | "O"
type Player = "X" | "O"

type BoardState = Array<Array<CellState>>

type MoveInfo = [number, number, CellState]

type MoveHistory = Array<MoveInfo>

type GameData = {
    name: string,
    boardState: BoardState,
    nextToMove: CellState,
    winner: null | Player,
    winningLine: null | Array<number>,
    previousGame: null | ObjectId,
    nextGame: null | ObjectId,
}

interface GameDataWithHistory extends GameData {
    history: MoveHistory,
}

interface GameDataWithHistoryAndTime extends GameDataWithHistory {
    timeStarted: Date,
    lastMoveMade: Date,
}

interface GameDataWithTime extends GameData {
    timeStarted: Date,
    lastMoveMade: Date,
}

export {
    CellState,
    Player,
    BoardState,
    MoveInfo,
    MoveHistory,
    GameData,
    GameDataWithHistory,
    GameDataWithHistoryAndTime,
    GameDataWithTime,
}
