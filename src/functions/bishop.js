import { copyBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"
import { pieceProtect } from "./pices"

const bishopUpMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col && y < newBoard.length) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], oldImageBoard[x][y], imageName)
    
            newBoard[x][y] = newValue
    
            if ((oldValue == newValue && newValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col && y >= 0) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], oldImageBoard[x][y], imageName)

            newBoard[x][y] = newValue

            if ((oldValue == newValue && newValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

const bishopDownMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x < newBoard.length; x++) {
        if (x != row && y != col && y < newBoard.length) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], oldImageBoard[x][y], imageName)

            newBoard[x][y] = newValue

            if ((oldValue == newValue && newValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x < newBoard.length; x++) {
        if (x != row && y != col && y >= 0) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], oldImageBoard[x][y], imageName)
            
            newBoard[x][y] = newValue

            if ((oldValue == newValue && newValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

export const bishopNormalMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        const newBoard = bishopUpMove(row, col, oldMoveBoard, Sides.Black, oldImageBoard)

        return bishopDownMove(row, col, newBoard, Sides.Black, oldImageBoard)
    }
    
    const newBoard = bishopUpMove(row, col, oldMoveBoard, Sides.White, oldImageBoard)

    return bishopDownMove(row, col, newBoard, Sides.White, oldImageBoard)
}

export const moveBishop = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = bishopNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing) {
                newBoard[x][y] = pieceProtect(x, y, newBoard, [row, col], oldImageBoard)
            }
        }
    }

    return newBoard
}
