import { copyBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"
import { isKingInDanger } from "./king"
import { pieceProtect } from "./pices"

const alfilUpMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
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

const alfilDownMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
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

export const alfilNormalMove = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides.Black, oldImageBoard)

        return alfilDownMove(row, col, newBoard, Sides.Black, oldImageBoard)
    }
    
    const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides.White, oldImageBoard)

    return alfilDownMove(row, col, newBoard, Sides.White, oldImageBoard)
}

const alfilSaveKing = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = alfilNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing) {
                newBoard[x][y] = pieceProtect(x, y, newBoard, [row, col], oldImageBoard)
            }
        }
    }

    return newBoard
}

export const moveAlfil = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    if (isKingInDanger(oldMoveBoard, imageName, oldImageBoard)) {
        return alfilSaveKing(row, col, oldMoveBoard, imageName, oldImageBoard)
    }

    return alfilNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
}