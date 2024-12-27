import { Sides, Space } from "../constants"
import { copyBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { pieceProtect } from "./pices"

const getHorseSpaces = (row, col, oldMoveBoard, imageToCheck, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (row - 2 >= 0) {
        if (col - 1 >= 0) {
            newBoard[row - 2][col - 1] = getMoveValue(newBoard[row - 2][col - 1], imageBoard[row - 2][col - 1], imageToCheck)
        }
        
        if (col + 1 < newBoard.length) {
            newBoard[row - 2][col + 1] = getMoveValue(newBoard[row - 2][col + 1], imageBoard[row - 2][col + 1], imageToCheck)
        }
    }
    
    if (row + 2 < newBoard.length) {
        if (col - 1 >= 0) {
            newBoard[row + 2][col - 1] = getMoveValue(newBoard[row + 2][col - 1], imageBoard[row + 2][col - 1], imageToCheck)
        }
        
        if (col + 1 < newBoard.length) {
            newBoard[row + 2][col + 1] = getMoveValue(newBoard[row + 2][col + 1], imageBoard[row + 2][col + 1], imageToCheck)
        }
    }
    
    if (col - 2 >= 0) {
        if (row - 1 >= 0) {
            newBoard[row - 1][col - 2] = getMoveValue(newBoard[row - 1][col - 2], imageBoard[row - 1][col - 2], imageToCheck)
        }
        
        if (row + 1 < newBoard.length) {
            newBoard[row + 1][col - 2] = getMoveValue(newBoard[row + 1][col - 2], imageBoard[row + 1][col - 2], imageToCheck)
        }
    }
    
    if (col + 2 < newBoard.length) {
        if (row - 1 >= 0) {
            newBoard[row - 1][col + 2] = getMoveValue(newBoard[row - 1][col + 2], imageBoard[row - 1][col + 2], imageToCheck)
        }
        
        if (row + 1 < newBoard.length) {
            newBoard[row + 1][col + 2] = getMoveValue(newBoard[row + 1][col + 2], imageBoard[row + 1][col + 2], imageToCheck)
        }
    }

    return newBoard
}

export const horseNormalMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        return getHorseSpaces(row, col, oldMoveBoard, Sides.Black, oldImageBoard)
    }

    return getHorseSpaces(row, col, oldMoveBoard, Sides.White, oldImageBoard)
}

export const moveHorse = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = horseNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing) {
                newBoard[x][y] = pieceProtect(x, y, newBoard, [row, col], oldImageBoard)
            }
        }
    }

    return newBoard
}
