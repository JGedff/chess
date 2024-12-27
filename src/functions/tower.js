import { copyBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"
import { pieceProtect } from "./pices"

const checkRowSpaces = (row, col, oldMoveBoard, imageNameToCheck, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)
    
    for (let w = col + 1; w < oldMoveBoard.length; w++) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], imageBoard[row][w], imageNameToCheck)
        
        newBoard[row][w] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let w = col - 1; w >= 0; w--) {
        const oldValue = newBoard[row][w]
        const newValue = getMoveValue(newBoard[row][w], imageBoard[row][w], imageNameToCheck)
        
        newBoard[row][w] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
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

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let h = row - 1; h >= 0; h--) {
        const oldValue = newBoard[h][col]
        const newValue = getMoveValue(newBoard[h][col], imageBoard[h][col], imageNameToCheck)
        
        newBoard[h][col] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    return newBoard
}

const addMoveTowerSpaces = (row, col, oldBoard, imageToCheck, imageBoard) => {
    const newBoard = checkColumnSpaces(row, col, oldBoard, imageToCheck, imageBoard)

    return checkRowSpaces(row, col, newBoard, imageToCheck, imageBoard)
}

export const towerNormalMove = (row, col, oldMoveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        return addMoveTowerSpaces(row, col, oldMoveBoard, Sides.White, imageBoard)
    }

    return addMoveTowerSpaces(row, col, oldMoveBoard, Sides.Black, imageBoard)
}

export const moveTower = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = towerNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing) {
                newBoard[x][y] = pieceProtect(x, y, newBoard, [row, col], oldImageBoard)
            }
        }
    }

    return newBoard
}
