import { MovingPiece, Space } from "../constants"
import { moveBishop } from "./bishop"
import { combineBoards, copyBoard } from "./board"
import { moveHorse } from "./horse"
import { moveKingOutOfCheck } from "./king"
import { movePawn } from "./pawn"
import { moveQueen } from "./queen"
import { moveTower } from "./tower"

export const getMoveValue = (value, imagePath, imageToCheck) => {
    let image = ''
    
    if (imagePath != [] && imagePath != undefined) {
        image = imagePath[0]
    }

    if (value == Space.Empty) {
        return Space.CanMove
    }
    else if (value == Space.Fill && image == imageToCheck) {
        return Space.Kill
    }
    else if ((value == Space.King || value == Space.Check) && image == imageToCheck) {
        return Space.KillKing
    }

    return value
}

export const checkMate = (board, imageBoard, side) => {
    if (someoneCanMove(board, imageBoard, side)) {
        return false
    }

    return true
}

const someoneCanMove = (board, imageBoard, side) => {
    let newBoard = copyBoard(board)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (side == imageBoard[x][y][0]) {
                const pieceMove = showMoves(x, y, newBoard, imageBoard)

                combineBoards(newBoard, pieceMove)
            }
        }
    }

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            const pieceValue = newBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing || pieceValue == Space.PawnSpecialMove) {
                return true
            }
        }
    }

    return false
}

export const showMoves = (row, col, oldBoard, imageBoard) => {
    let newBoard = copyBoard(oldBoard)

    const [side, piece] = imageBoard[row][col]
    const oldPieceValue = oldBoard[row][col]

    if (oldPieceValue == Space.Fill || oldPieceValue == Space.King) {
        MovingPiece[0] = [side, piece]
        MovingPiece[1] = row
        MovingPiece[2] = col
        MovingPiece[3] = newBoard[row][col]

        switch (piece) {
            case "pawn":
                movePawn(row, col, newBoard, side, imageBoard)
                break
            case "tower":
                moveTower(row, col, newBoard, side, imageBoard)
                break
            case "bishop":
                moveBishop(row, col, newBoard, side, imageBoard)
                break
            case "queen":
                moveQueen(row, col, newBoard, side, imageBoard)
                break
            case "king":
                moveKingOutOfCheck(row, col, newBoard, imageBoard)
                break
            case "horse":
                moveHorse(row, col, newBoard, side, imageBoard)
                break
            default:
                break
        }
    }
    else if (oldPieceValue == Space.Check) {
        MovingPiece[0] = [side, piece]
        MovingPiece[1] = row
        MovingPiece[2] = col
        MovingPiece[3] = newBoard[row][col]
        
        moveKingOutOfCheck(row, col, newBoard, imageBoard)
    }

    return newBoard
}
