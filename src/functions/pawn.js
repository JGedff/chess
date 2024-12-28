import { copyBoard } from "./board"
import { Sides, Space } from "../constants"
import { pieceProtect } from "./pices"

export const transformPawn = (changeTurn, showTransformModal) => {
    showTransformModal()
    changeTurn()
}

export const pawnNormalMove = (row, col, oldMoveBoard, imageName, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (imageName == Sides.White && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == Space.Fill && imageBoard[row - 1][col - 1].split('/')[1] == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col - 1] = Space.PawnSpecialMove
                }
                else {
                    newBoard[row - 1][col - 1] = Space.Kill
                }
            }
            else if ((newBoard[row - 1][col - 1] == Space.King || newBoard[row - 1][col - 1] == Space.Check) && imageBoard[row - 1][col - 1].split('/')[1] == Sides.Black) {
                newBoard[row - 1][col - 1] = Space.KillKing
            }
        }

        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == Space.Fill && imageBoard[row - 1][col + 1].split('/')[1] == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col + 1] = Space.PawnSpecialMove
                }
                else {
                    newBoard[row - 1][col + 1] = Space.Kill
                }
            }
            else if ((newBoard[row - 1][col + 1] == Space.King || newBoard[row - 1][col + 1] == Space.Check) && imageBoard[row - 1][col + 1].split('/')[1] == Sides.Black) {
                newBoard[row - 1][col + 1] = Space.KillKing
            }
        }

        // Special Move
        if (row - 1 == 0) {
            if (newBoard[row - 1][col] == Space.Empty) {
                newBoard[row - 1][col] = Space.PawnSpecialMove
            }
        }
        else if (row == 6) { // Move
            if (newBoard[row - 1][col] != Space.Fill && newBoard[row - 2][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
                newBoard[row - 2][col] = Space.CanMove
            }
            else if (newBoard[row - 1][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
            }
        }
        else {
            if (newBoard[row - 1][col] != Space.Fill) {
                newBoard[row - 1][col] = Space.CanMove
            }
        }
    }
    else if (imageName == Sides.Black && row + 1 <= newBoard.length - 1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == Space.Fill && imageBoard[row + 1][col - 1].split('/')[1] == Sides.White) {
                if (row + 1 == newBoard.length - 1) {
                    newBoard[row + 1][col - 1] = Space.PawnSpecialMove
                }
                else {
                    newBoard[row + 1][col - 1] = Space.Kill
                }
            }
            else if ((newBoard[row + 1][col - 1] == Space.King || newBoard[row + 1][col - 1] == Space.Check) && imageBoard[row + 1][col - 1].split('/')[1] == Sides.White) {
                newBoard[row + 1][col - 1] = Space.KillKing
            }
        }

        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == Space.Fill && imageBoard[row + 1][col + 1].split('/')[1] == Sides.White) {
                if (row + 1 == newBoard.length - 1) {
                    newBoard[row + 1][col + 1] = Space.PawnSpecialMove
                }
                else {
                    newBoard[row + 1][col + 1] = Space.Kill
                }
            }
            else if ((newBoard[row + 1][col + 1] == Space.King || newBoard[row + 1][col + 1] == Space.Check) && imageBoard[row + 1][col + 1].split('/')[1] == Sides.White) {
                newBoard[row + 1][col + 1] = Space.KillKing
            }
        }

        // Special Move
        if (row + 1 == newBoard.length - 1) {
            if (newBoard[row + 1][col] == Space.Empty) {
                newBoard[row + 1][col] = Space.PawnSpecialMove
            }
        }
        else if (row == 1) { // Move
            if (newBoard[row + 1][col] != Space.Fill && newBoard[row + 2][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
                newBoard[row + 2][col] = Space.CanMove
            }
            else if (newBoard[row + 1][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
            }
        }
        else {
            if (newBoard[row + 1][col] != Space.Fill) {
                newBoard[row + 1][col] = Space.CanMove
            }
        }
    }

    return newBoard
}

export const movePawn = (row, col, oldMoveBoard, imageName, oldImageBoard) => {
    const newBoard = pawnNormalMove(row, col, oldMoveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.CanMove || newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.KillKing) {
                newBoard[x][y] = pieceProtect(x, y, newBoard, [row, col], oldImageBoard)
            }
        }
    }

    return newBoard
}
