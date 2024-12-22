import { copyBoard, getImage } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides, Space } from "../constants"

const alfilUpMove = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col && y < newBoard.length) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], getImage(x, y), imageName)
    
            newBoard[x][y] = newValue
    
            if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col && y >= 0) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], getImage(x, y), imageName)

            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

const alfilDownMove = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x < newBoard.length; x++) {
        if (x != row && y != col && y < newBoard.length) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], getImage(x, y), imageName)

            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x < newBoard.length; x++) {
        if (x != row && y != col && y >= 0) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], getImage(x, y), imageName)
            
            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

export const moveAlfil = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides.White) {
        const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides.Black)

        return alfilDownMove(row, col, newBoard, Sides.Black)
    }
    
    const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides.White)

    return alfilDownMove(row, col, newBoard, Sides.White)
}