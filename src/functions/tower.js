import { copyBoard, ImageBoard, MovingPiece } from "./board"

const checkRowSpaces = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)
    
    for (let w = col + 1; w < oldMoveBoard.length; w++) {
        if (oldMoveBoard[row][w] == 1 && ImageBoard[row][w].split('/')[1] == imageNameToCheck) {
            newBoard[row][w] = 3
            break
        }
        else if (oldMoveBoard[row][w] != 1) {
            newBoard[row][w] = 2
        }
        else {
            break
        }
    }

    for (let w = col - 1; w >= 0; w--) {
        if (oldMoveBoard[row][w] == 1 && ImageBoard[row][w].split('/')[1] == imageNameToCheck) {
            newBoard[row][w] = 3
            break
        }
        else if (oldMoveBoard[row][w] != 1) {
            newBoard[row][w] = 2
        }
        else {
            break
        }
    }

    return newBoard
}

const checkColumnSpaces = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)

    for (let h = row + 1; h < oldMoveBoard.length; h++) {
        if (oldMoveBoard[h][col] == 1 && ImageBoard[h][col].split('/')[1] == imageNameToCheck) {
            newBoard[h][col] = 3
            break
        }
        else if (oldMoveBoard[h][col] != 1) {
            newBoard[h][col] = 2
        }
        else {
            break
        }
    }

    for (let h = row - 1; h >= 0; h--) {
        if (oldMoveBoard[h][col] == 1 && ImageBoard[h][col].split('/')[1] == imageNameToCheck) {
            newBoard[h][col] = 3
            break
        }
        else if (oldMoveBoard[h][col] != 1) {
            newBoard[h][col] = 2
        }
        else {
            break
        }
    }

    return newBoard
}

const addMoveTowerSpaces = (row, col, oldBoard, imageToCheck) => {
    let newBoard = checkColumnSpaces(row, col, oldBoard, imageToCheck)

    newBoard = checkRowSpaces(row, col, newBoard, imageToCheck)

    return newBoard
}

export const moveTower = (row, col, oldMoveBoard) => {
    let imagePath = ImageBoard[row][col].split('/')
    let newBoard = copyBoard(oldMoveBoard)

    MovingPiece[0][0] = imagePath.join('/')
    MovingPiece[0][1] = row
    MovingPiece[0][2] = col

    if (imagePath[1] == 'white') {
        newBoard = addMoveTowerSpaces(row, col, oldMoveBoard, 'black')
    }
    else {
        newBoard = addMoveTowerSpaces(row, col, oldMoveBoard, 'white')
    }

    return newBoard
}
