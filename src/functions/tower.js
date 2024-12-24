import { copyBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"

const checkRowSpaces = (row, col, oldMoveBoard, imageNameToCheck, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)
    
    for (let w = col + 1; w < oldMoveBoard.length; w++) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], imageBoard[row][w], imageNameToCheck)
        
        newBoard[row][w] = newValue

        if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let w = col - 1; w >= 0; w--) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], imageBoard[row][w], imageNameToCheck)
        
        newBoard[row][w] = newValue

        if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    return newBoard
}

const checkColumnSpaces = (row, col, oldMoveBoard, imageNameToCheck, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)

    for (let h = row + 1; h < oldMoveBoard.length; h++) {
        const oldValue = newBoard[h][col]
        const newValue = getMoveValue(newBoard[h][col], imageBoard[h][col], imageNameToCheck)
        
        newBoard[h][col] = newValue

        if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let h = row - 1; h >= 0; h--) {
        const oldValue = newBoard[h][col]
        const newValue = getMoveValue(newBoard[h][col], imageBoard[h][col], imageNameToCheck)
        
        newBoard[h][col] = newValue

        if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    return newBoard
}

const addMoveTowerSpaces = (row, col, oldBoard, imageToCheck, imageBoard) => {
    const newBoard = checkColumnSpaces(row, col, oldBoard, imageToCheck, imageBoard)

    return checkRowSpaces(row, col, newBoard, imageToCheck, imageBoard)
}

export const moveTower = (row, col, oldMoveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        return addMoveTowerSpaces(row, col, oldMoveBoard, Sides.White, imageBoard)
    }

    return addMoveTowerSpaces(row, col, oldMoveBoard, Sides.Black, imageBoard)
}
