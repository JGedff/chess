import { copyBoard } from "./board"
import { Sides, Space } from "../constants"
import { getMoveValue } from "./checkMove"
import { towerNormalMove } from "./tower"
import { bishopNormalMove } from "./bishop"
import { horseNormalMove } from "./horse"
import { pawnNormalMove } from "./pawn"
import { queenNormalMove } from "./queen"

const getMoveArround = (row, col, moveBoard, imageNameToCheck, imageBoard) => {
    for (let x = row - 1; x <= row + 1; x++) {
        if (x >= 0 && x < moveBoard.length) {
            for (let y = col - 1; y <= col + 1; y++) {
                if (y >= 0 && y < moveBoard.length) {
                    moveBoard[x][y] = getMoveValue(moveBoard[x][y], imageBoard[x][y], imageNameToCheck)
                }
            }
        }
    }
}

export const moveKing = (row, col, moveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        getMoveArround(row, col, moveBoard, Sides.White, imageBoard)
    }
    else {
        getMoveArround(row, col, moveBoard, Sides.Black, imageBoard)
    }
}

const getCheck = (row, col, piece, board, imageToCheck, imageBoard) => {
    let newBoard = copyBoard(board)

    switch (piece) {
        case "pawn":
            pawnNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "tower":
            towerNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "bishop":
            bishopNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "queen":
            queenNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "king":
            moveKing(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "horse":
            horseNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        default:
            break
    }
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.KillKing) {
                return [x, y]
            }
        }
    }

    return false
}

export const getAllKingCheck = (board, imageBoard) => {
    const newBoard = copyBoard(board)
    const allChecks = []

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            const pieceImage = imageBoard[x][y]
            const isCheck = getCheck(x, y, pieceImage[1], newBoard, pieceImage[0], imageBoard)

            if (isCheck != false) {
                allChecks.push(isCheck)
            }
        }
    }

    allChecks.forEach(([row, col]) => {
        newBoard[row][col] = Space.Check
    })

    return newBoard
}

export const isKingInDanger = (board, side, imageBoard) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (board[x][y] == Space.Check && imageBoard[x][y][0] == side) {
                return true
            }
        }
    }

    return false
}

export const moveKingOutOfCheck = (row, col, moveBoard, imageBoard) => {
    moveKing(row, col, moveBoard, imageBoard[row][col][0], imageBoard)
    
    for (let x = row - 1; x < row + 2; x++) {
        if (x >= 0 && x < moveBoard.length) {
            for (let y = col - 1; y < col + 2; y++) {
                if ((y >= 0 && y < moveBoard.length) && !(x == row && y == col)) {
                    const pieceValue = moveBoard[x][y]

                    if (pieceValue == Space.Kill || pieceValue == Space.CanMove) {
                        moveBoard[x][y] = secureKing(x, y, moveBoard, pieceValue, imageBoard, row, col)
                    }
                }
            }
        }
    }
}

const secureKing = (row, col, oldMoveBoard, newValue, oldImageBoard, oldRow, oldCol) => {
    let newBoard = copyBoard(oldMoveBoard)
    let newImageBoard = copyBoard(oldImageBoard)

    newBoard[row][col] = Space.King
    newBoard[oldRow][oldCol] = Space.Empty

    newImageBoard[row][col] = newImageBoard[oldRow][oldCol]
    newImageBoard[oldRow][oldCol] = []

    newBoard = getAllKingCheck(newBoard, newImageBoard)

    if (newBoard[row][col] == Space.King) {
        return newValue
    }
    else {
        if (newValue == Space.Kill) {
            return Space.Fill
        }
        else {
            return Space.Empty
        }
    }
}

export const getKingPos = (board, imageBoard, side) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const pieceValue = board[x][y]

            if ((pieceValue == Space.King || pieceValue == Space.Check) && imageBoard[x][y][0] == side) {
                return [x, y]
            } 
        }
    }

    return [-1, -1]
}