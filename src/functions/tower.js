import { copyBoard, getImage } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides } from "../constants"

const checkRowSpaces = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)
    
    for (let w = col + 1; w < oldMoveBoard.length; w++) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], getImage(row, w), imageNameToCheck)
        
        newBoard[row][w] = newValue

        if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
            break
        }
    }

    for (let w = col - 1; w >= 0; w--) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], getImage(row, w), imageNameToCheck)
        
        newBoard[row][w] = newValue

        if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
            break
        }
    }

    return newBoard
}

const checkColumnSpaces = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)

    for (let h = row + 1; h < oldMoveBoard.length; h++) {
        const oldValue = newBoard[h][col]
        const newValue = getMoveValue(newBoard[h][col], getImage(h, col), imageNameToCheck)
        
        newBoard[h][col] = newValue

        if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
            break
        }
    }

    for (let h = row - 1; h >= 0; h--) {
        const oldValue = newBoard[h][col]
        const newValue = getMoveValue(newBoard[h][col], getImage(h, col), imageNameToCheck)
        
        newBoard[h][col] = newValue

        if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
            break
        }
    }

    return newBoard
}

const addMoveTowerSpaces = (row, col, oldBoard, imageToCheck) => {
    const newBoard = checkColumnSpaces(row, col, oldBoard, imageToCheck)

    return checkRowSpaces(row, col, newBoard, imageToCheck)
}

export const moveTower = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides[1]) {
        return addMoveTowerSpaces(row, col, oldMoveBoard, Sides[0])
    }

    return addMoveTowerSpaces(row, col, oldMoveBoard, Sides[1])
}
