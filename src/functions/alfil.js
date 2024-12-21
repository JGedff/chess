import { copyBoard, ImageBoard } from "./board"
import { getMoveValue } from "./checkMove"

const alfilUpMove = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)
    let y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], ImageBoard[x][y], imageName)
    
            newBoard[x][y] = newValue
    
            if (oldValue == newValue || newValue == 3) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x >= 0; x--) {
        if (x != row && y != col) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], ImageBoard[x][y], imageName)

            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == 3) {
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

    for (let x = row; x < newBoard.length - 1; x++) {
        if (x != row && y != col) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], ImageBoard[x][y], imageName)

            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == 3) {
                break
            }
        }

        y += 1
    }
    
    y = col

    for (let x = row; x < newBoard.length; x++) {
        if (x != row && y != col) {
            const oldValue = newBoard[x][y]
            const newValue = getMoveValue(newBoard[x][y], ImageBoard[x][y], imageName)
            
            newBoard[x][y] = newValue

            if (oldValue == newValue || newValue == 3) {
                break
            }
        }

        y -= 1
    }

    return newBoard
}

export const moveAlfil = (row, col, oldMoveBoard, imageName) => {
    if (imageName == 'white') {
        const newBoard = alfilUpMove(row, col, oldMoveBoard, 'black')

        return alfilDownMove(row, col, newBoard, 'black')
    }
    
    const newBoard = alfilUpMove(row, col, oldMoveBoard, 'white')

    return alfilDownMove(row, col, newBoard, 'white')
}