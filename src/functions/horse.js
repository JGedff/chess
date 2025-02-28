import { Sides, Space } from "../constants"
import { getMoveValue } from "./checkMove"
import { pieceProtect } from "./pices"

const getHorseSpaces = (row, col, moveBoard, imageToCheck, imageBoard) => {
    if (row - 2 >= 0) {
        if (col - 1 >= 0) {
            moveBoard[row - 2][col - 1] = getMoveValue(moveBoard[row - 2][col - 1], imageBoard[row - 2][col - 1], imageToCheck)
        }
        
        if (col + 1 < moveBoard.length) {
            moveBoard[row - 2][col + 1] = getMoveValue(moveBoard[row - 2][col + 1], imageBoard[row - 2][col + 1], imageToCheck)
        }
    }
    
    if (row + 2 < moveBoard.length) {
        if (col - 1 >= 0) {
            moveBoard[row + 2][col - 1] = getMoveValue(moveBoard[row + 2][col - 1], imageBoard[row + 2][col - 1], imageToCheck)
        }
        
        if (col + 1 < moveBoard.length) {
            moveBoard[row + 2][col + 1] = getMoveValue(moveBoard[row + 2][col + 1], imageBoard[row + 2][col + 1], imageToCheck)
        }
    }
    
    if (col - 2 >= 0) {
        if (row - 1 >= 0) {
            moveBoard[row - 1][col - 2] = getMoveValue(moveBoard[row - 1][col - 2], imageBoard[row - 1][col - 2], imageToCheck)
        }
        
        if (row + 1 < moveBoard.length) {
            moveBoard[row + 1][col - 2] = getMoveValue(moveBoard[row + 1][col - 2], imageBoard[row + 1][col - 2], imageToCheck)
        }
    }
    
    if (col + 2 < moveBoard.length) {
        if (row - 1 >= 0) {
            moveBoard[row - 1][col + 2] = getMoveValue(moveBoard[row - 1][col + 2], imageBoard[row - 1][col + 2], imageToCheck)
        }
        
        if (row + 1 < moveBoard.length) {
            moveBoard[row + 1][col + 2] = getMoveValue(moveBoard[row + 1][col + 2], imageBoard[row + 1][col + 2], imageToCheck)
        }
    }
}

export const horseNormalMove = (row, col, moveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        getHorseSpaces(row, col, moveBoard, Sides.Black, oldImageBoard)
    }
    else {
        getHorseSpaces(row, col, moveBoard, Sides.White, oldImageBoard)
    }
}

export const moveHorse = (row, col, moveBoard, imageName, oldImageBoard) => {
    horseNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}
