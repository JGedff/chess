import { AI } from "./index"
import { selectRandomPiece } from "./doRandomMove"
import { getNextMove } from "./miniMax"
import { Sides, Space } from "../constants"
import { copyBoard } from "../functions"
import { getBestMove, updateMove } from "./miniMax-chess"

export const move = (spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, turn) => {
    let side = Sides.White

    if (!turn) {
        side = Sides.Black
    }

    const newImageBoard = copyBoard(spaceImageBoard)
    const newValueBoard = copyBoard(spaceBoard)
    
    if (AI.difficulty == 'Random') {
        selectRandomPiece(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, side, [])
    }
    else if (AI.difficulty == 'Easy') {
        let startDate = new Date()
        const [piecePos, newPiecePos] = getNextMove(spaceImageBoard, spaceBoard, 4, side)
        let endDate = new Date()
        console.log((endDate - startDate) / 1000)
        
        newImageBoard[newPiecePos[0]][newPiecePos[1]] = newImageBoard[piecePos[0]][piecePos[1]]
        newImageBoard[piecePos[0]][piecePos[1]] = []
        
        newValueBoard[newPiecePos[0]][newPiecePos[1]] = newValueBoard[piecePos[0]][piecePos[1]]
        newValueBoard[piecePos[0]][piecePos[1]] = Space.Empty
        
        updateImageBoard(newImageBoard)
        updateBoard(newValueBoard)
        handleTurn()
    }
    else if (AI.difficulty == 'Chessjs') {
        let startDate = new Date()
        const [piecePos, newPiecePos] = getBestMove(4)
        let endDate = new Date()
        console.log((endDate - startDate) / 1000)

        newImageBoard[newPiecePos[0]][newPiecePos[1]] = newImageBoard[piecePos[0]][piecePos[1]]
        newImageBoard[piecePos[0]][piecePos[1]] = []

        newValueBoard[newPiecePos[0]][newPiecePos[1]] = newValueBoard[piecePos[0]][piecePos[1]]
        newValueBoard[piecePos[0]][piecePos[1]] = Space.Empty

        updateMove(piecePos, newPiecePos)

        updateImageBoard(newImageBoard)
        updateBoard(newValueBoard)
        handleTurn()
    }
    else {
        console.error(`${AI.difficulty} difficulty does is not suported by the AI`)
    }
}