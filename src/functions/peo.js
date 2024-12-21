import { copyBoard, ImageBoard } from "./board"

export const movePeo = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (imageName == 'white' && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == 1 && ImageBoard[row - 1][col - 1].split('/')[1] == 'black') {
                newBoard[row - 1][col - 1] = 3
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == 1 && ImageBoard[row - 1][col + 1].split('/')[1] == 'black') {
                newBoard[row - 1][col + 1] = 3
            }
        }

        // Move
        if (row - 1 == 0) {
            if (oldMoveBoard[row - 1][col] != 1) {
                newBoard[row - 1][col] = 4
            }
        }
        else if (row == 6) {
            if (oldMoveBoard[row - 1][col] != 1 && oldMoveBoard[row - 2][col] != 1) {
                newBoard[row - 1][col] = 2
                newBoard[row - 2][col] = 2
            }
            else if (oldMoveBoard[row - 1][col] != 1) {
                newBoard[row - 1][col] = 2
            }
        }
        else {
            if (oldMoveBoard[row - 1][col] != 1) {
                newBoard[row - 1][col] = 2
            }
        }
    }
    else if (imageName == 'black' && row + 1 <= oldMoveBoard.length -1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == 1 && ImageBoard[row + 1][col - 1].split('/')[1] == 'white') {
                newBoard[row + 1][col - 1] = 3
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == 1 && ImageBoard[row + 1][col + 1].split('/')[1] == 'white') {
                newBoard[row + 1][col + 1] = 3
            }
        }

        // Move
        if (row + 1 == oldMoveBoard.length - 1) {
            if (oldMoveBoard[row + 1][col] != 1) {
                newBoard[row + 1][col] = 4
            }
        }
        else if (row == 1) {
            if (oldMoveBoard[row + 1][col] != 1 && oldMoveBoard[row + 2][col] != 1) {
                newBoard[row + 1][col] = 2
                newBoard[row + 2][col] = 2
            }
            else if (oldMoveBoard[row + 1][col] != 1) {
                newBoard[row + 1][col] = 2
            }
        }
        else {
            if (oldMoveBoard[row + 1][col] != 1) {
                newBoard[row + 1][col] = 2
            }
        }
    }

    return newBoard
}