import { Sides } from "../constants"
import { copyBoard, getImage } from "./board"
import { getMoveValue } from "./checkMove"

const getHorseSpaces = (row, col, oldMoveBoard, imageToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (row - 2 >= 0) {
        if (col - 1 >= 0) {
            newBoard[row - 2][col - 1] = getMoveValue(newBoard[row - 2][col - 1], getImage(row - 2, col - 1), imageToCheck)
        }
        
        if (col + 1 < newBoard.length) {
            newBoard[row - 2][col + 1] = getMoveValue(newBoard[row - 2][col + 1], getImage(row - 2, col + 1), imageToCheck)
        }
    }
    
    if (row + 2 < newBoard.length) {
        if (col - 1 >= 0) {
            newBoard[row + 2][col - 1] = getMoveValue(newBoard[row + 2][col - 1], getImage(row + 2, col - 1), imageToCheck)
        }
        
        if (col + 1 < newBoard.length) {
            newBoard[row + 2][col + 1] = getMoveValue(newBoard[row + 2][col + 1], getImage(row + 2, col + 1), imageToCheck)
        }
    }
    
    if (col - 2 >= 0) {
        if (row - 1 >= 0) {
            newBoard[row - 1][col - 2] = getMoveValue(newBoard[row - 1][col - 2], getImage(row - 1, col - 2), imageToCheck)
        }
        
        if (row + 1 < newBoard.length) {
            newBoard[row + 1][col - 2] = getMoveValue(newBoard[row + 1][col - 2], getImage(row + 1, col - 2), imageToCheck)
        }
    }
    
    if (col + 2 < newBoard.length) {
        if (row - 1 >= 0) {
            newBoard[row - 1][col + 2] = getMoveValue(newBoard[row - 1][col + 2], getImage(row - 1, col + 2), imageToCheck)
        }
        
        if (row + 1 < newBoard.length) {
            newBoard[row + 1][col + 2] = getMoveValue(newBoard[row + 1][col + 2], getImage(row + 1, col + 2), imageToCheck)
        }
    }

    return newBoard
}

export const moveHorse = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides[0]) {
        return getHorseSpaces(row, col, oldMoveBoard, Sides[1])
    }

    return getHorseSpaces(row, col, oldMoveBoard, Sides[0])
}