import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"
import { pieceProtect } from "./pices"

const addMoveTowerSpaces = (row, col, moveBoard, side, imageBoard) => {
    for (let x = row + 1; x < moveBoard.length; x++) {
        const oldValue = moveBoard[x][col]
        const newValue = getMoveValue(oldValue, imageBoard[x][col], side)
        
        moveBoard[x][col] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let x = row - 1; x >= 0; x--) {
        const oldValue = moveBoard[x][col]
        const newValue = getMoveValue(oldValue, imageBoard[x][col], side)
        
        moveBoard[x][col] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let y = col + 1; y < moveBoard.length; y++) {
        const oldValue = moveBoard[row][y]
        const newValue = getMoveValue(oldValue, imageBoard[row][y], side)
        
        moveBoard[row][y] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }

    for (let y = col - 1; y >= 0; y--) {
        const oldValue = moveBoard[row][y]
        const newValue = getMoveValue(oldValue, imageBoard[row][y], side)
        
        moveBoard[row][y] = newValue

        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }
}

export const towerNormalMove = (row, col, moveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        addMoveTowerSpaces(row, col, moveBoard, Sides.White, imageBoard)
    } else {
        addMoveTowerSpaces(row, col, moveBoard, Sides.Black, imageBoard)
    }
}

export const moveTower = (row, col, moveBoard, imageName, oldImageBoard) => {
    towerNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}
