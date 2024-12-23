import { copyBoard, getSide } from "./board"
import { Sides, Space } from "../constants"

export const movePeo = (row, col, oldMoveBoard, imageName) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (imageName == Sides.White && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == Space.Fill && getSide(row - 1, col - 1) == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col - 1] = Space.SpecialMove
                }
                else {
                    newBoard[row - 1][col - 1] = Space.Kill
                }
            }
            else if ((newBoard[row - 1][col - 1] == Space.King || newBoard[row - 1][col - 1] == Space.Check) && getSide(row - 1, col - 1) == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col - 1] = Space.SpecialMove
                }
                else {
                    newBoard[row - 1][col - 1] = Space.KillKing
                }
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == Space.Fill && getSide(row - 1, col + 1) == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col + 1] = Space.SpecialMove
                }
                else {
                    newBoard[row - 1][col + 1] = Space.Kill
                }
            }
            else if ((newBoard[row - 1][col + 1] == Space.King || newBoard[row - 1][col + 1] == Space.Check) && getSide(row - 1, col + 1) == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col + 1] = Space.SpecialMove
                }
                else {
                    newBoard[row - 1][col + 1] = Space.KillKing
                }
            }
        }

        // Special Move
        if (row - 1 == 0) {
            if (oldMoveBoard[row - 1][col] == Space.Empty) {
                newBoard[row - 1][col] = Space.SpecialMove
            }
        }
        else if (row == 6) { // Move
            if (oldMoveBoard[row - 1][col] != Space.Fill && oldMoveBoard[row - 2][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
                newBoard[row - 2][col] = Space.CanMove
            }
            else if (oldMoveBoard[row - 1][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
            }
        }
        else {
            if (oldMoveBoard[row - 1][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
            }
        }
    }
    else if (imageName == Sides.Black && row + 1 <= oldMoveBoard.length - 1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == Space.Fill && getSide(row + 1, col - 1) == Sides.White) {
                if (row + 1 == oldMoveBoard.length - 1) {
                    newBoard[row + 1][col - 1] = Space.SpecialMove
                }
                else {
                    newBoard[row + 1][col - 1] = Space.Kill
                }
            }
            else if ((newBoard[row + 1][col - 1] == Space.King || newBoard[row + 1][col - 1] == Space.Check) && getSide(row + 1, col - 1) == Sides.White) {
                newBoard[row + 1][col - 1] = Space.KillKing
            }
        }

        if (col + 1 <= oldMoveBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == Space.Fill && getSide(row + 1, col + 1) == Sides.White) {
                if (row + 1 == oldMoveBoard.length - 1) {
                    newBoard[row + 1][col + 1] = Space.SpecialMove
                }
                else {
                    newBoard[row + 1][col + 1] = Space.Kill
                }
            }
            else if ((newBoard[row + 1][col + 1] == Space.King || newBoard[row + 1][col + 1] == Space.Check) && getSide(row + 1, col + 1) == Sides.White) {
                if (row + 1 == oldMoveBoard.length - 1) {
                    newBoard[row + 1][col + 1] = Space.SpecialMove
                }
                else{
                    newBoard[row + 1][col + 1] = Space.KillKing
                }
            }
        }

        // Special Move
        if (row + 1 == oldMoveBoard.length - 1) {
            if (oldMoveBoard[row + 1][col] == Space.Empty) {
                newBoard[row + 1][col] = Space.SpecialMove
            }
        }
        else if (row == 1) { // Move
            if (oldMoveBoard[row + 1][col] != Space.Fill && oldMoveBoard[row + 2][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
                newBoard[row + 2][col] = Space.CanMove
            }
            else if (oldMoveBoard[row + 1][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
            }
        }
        else {
            if (oldMoveBoard[row + 1][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
            }
        }
    }

    return newBoard
}

export const transformPeo = (changeTurn, showTransformModal) => {
    showTransformModal()
    changeTurn()
}