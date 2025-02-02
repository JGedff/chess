import { MovingPiece, Sides, Space } from "../constants"
import { moveBishop } from "./bishop"
import { combineBoards, copyBoard } from "./board"
import { moveHorse } from "./horse"
import { moveKing, moveKingOutOfCheck } from "./king"
import { movePawn } from "./pawn"
import { handleMovePiece, pieceProtect } from "./pices"
import { moveTower } from "./tower"

export const getMoveValue = (value, imagePath, imageToCheck) => {
    let image = ''
    
    if (imagePath != '' && imagePath != undefined) {
        image = imagePath.split('/')[1]
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
    let newBoard = copyBoard(board)

    if (someoneCanMove(newBoard, imageBoard, side)) {
        return false
    }

    return true
}

const someoneCanMove = (board, imageBoard, side) => {
    let newBoard = copyBoard(board)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (side == imageBoard[x][y].split('/')[1]) {
                const pieceMove = showMoves(x, y, newBoard, imageBoard)

                newBoard = combineBoards(pieceMove, newBoard)
            }
        }
    }

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing || newBoard[x][y] == Space.PawnSpecialMove) {
                return true
            }
        }
    }

    return false
}

export const showMoves = (row, col, oldBoard, oldImageBoard) => {
    let newBoard = copyBoard(oldBoard)
    let imageBoard = copyBoard(oldImageBoard)

    const imagePath = imageBoard[row][col].split('/')

    if (oldBoard[row][col] == Space.Fill || oldBoard[row][col] == Space.King) {
        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        switch (imagePath[2]) {
            case "pawn.png":
                newBoard = movePawn(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "tower.png":
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "bishop.png":
                newBoard = moveBishop(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "queen.png":
                newBoard = moveBishop(row, col, newBoard, imagePath[1], imageBoard)
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "king.png":
                newBoard = moveKingOutOfCheck(row, col, newBoard, imageBoard)
                break
            case "horse.png":
                newBoard = moveHorse(row, col, newBoard, imagePath[1], imageBoard)
                break
            default:
                break
        }
    }
    else if (oldBoard[row][col] == Space.Check) {
        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        newBoard = moveKingOutOfCheck(row, col, newBoard, imageBoard)
    }

    return newBoard
}