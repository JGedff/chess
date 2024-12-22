import { copyBoard, getSide } from "./board"
import { Sides } from "../constants"

export const movePeo = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (imageName == Sides[1] && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == 1 && getSide(row - 1, col - 1) == Sides[0]) {
                newBoard[row - 1][col - 1] = 3
            }
            else if ((newBoard[row - 1][col - 1] == 5 || newBoard[row - 1][col - 1] == 7) && getSide(row - 1, col - 1) == Sides[1]) {
                newBoard[row - 1][col - 1] = 6
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == 1 && getSide(row - 1, col + 1) == Sides[0]) {
                newBoard[row - 1][col + 1] = 3
            }
            else if ((newBoard[row - 1][col + 1] == 5 || newBoard[row - 1][col + 1] == 7) && getSide(row - 1, col + 1) == Sides[1]) {
                newBoard[row - 1][col + 1] = 6
            }
        }

        // Special Move
        if (row - 1 == 0) {
            if (oldMoveBoard[row - 1][col] != 1 && oldMoveBoard[row - 1][col] != 5 && oldMoveBoard[row - 1][col] != 7) {
                newBoard[row - 1][col] = 4
            }
        }
        else if (row == 6) { // Move
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
    else if (imageName == Sides[0] && row + 1 <= oldMoveBoard.length -1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == 1 && getSide(row + 1, col - 1) == Sides[1]) {
                newBoard[row + 1][col - 1] = 3
            }
            else if ((newBoard[row + 1][col - 1] == 5 || newBoard[row + 1][col - 1] == 7) && getSide(row + 1, col - 1) == Sides[1]) {
                newBoard[row + 1][col - 1] = 6
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == 1 && getSide(row + 1, col + 1) == Sides[1]) {
                newBoard[row + 1][col + 1] = 3
            }
            else if ((newBoard[row + 1][col + 1] == 5 || newBoard[row + 1][col + 1] == 7) && getSide(row + 1, col + 1) == Sides[1]) {
                newBoard[row + 1][col + 1] = 6
            }
        }

        // Special Move
        if (row + 1 == oldMoveBoard.length - 1) {
            if (oldMoveBoard[row + 1][col] != 1 && oldMoveBoard[row + 1][col] != 5 && oldMoveBoard[row + 1][col] != 7) {
                newBoard[row + 1][col] = 4
            }
        }
        else if (row == 1) { // Move
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

export const transformPeo = (changeTurn, showTransformModal) => {
    showTransformModal()
    changeTurn()
}