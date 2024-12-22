import { copyBoard, getImage } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides } from "../constants"

const alfilUpMove = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col && y < newBoard.length) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], getImage(x, y), imageName)
    
            newBoard[x][y] = newValue
    
            if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
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

            if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
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

            if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
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

            if (oldValue == newValue || newValue == 3 || newValue == 5 || newValue == 6 || newValue == 7) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

export const moveAlfil = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides[1]) {
        const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides[0])

        return alfilDownMove(row, col, newBoard, Sides[0])
    }
    
    const newBoard = alfilUpMove(row, col, oldMoveBoard, Sides[1])

    return alfilDownMove(row, col, newBoard, Sides[1])
}