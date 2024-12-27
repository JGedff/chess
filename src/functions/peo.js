import { copyBoard } from "./board"
import { Sides, Space } from "../constants"
import { isKingInDanger } from "./king"
import { pieceProtect } from "./pices"

export const movePeo = (row, col, oldMoveBoard, imageName, imageBoard) => {
    if (isKingInDanger(oldMoveBoard, imageName, imageBoard)) {
        return peoSaveKing(row, col, oldMoveBoard, imageName, imageBoard)
    }

    return peoNormalMove(row, col, oldMoveBoard, imageName, imageBoard)
}

export const transformPeo = (changeTurn, showTransformModal) => {
    showTransformModal()
    changeTurn()
}

export const peoNormalMove = (row, col, oldMoveBoard, imageName, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)

    if (imageName == Sides.White && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == Space.Fill && imageBoard[row - 1][col - 1].split('/')[1] == Sides.Black) {
                if (row - 1 == 0) {
                    newBoard[row - 1][col - 1] = Space.PeoSpecialMove
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
                    newBoard[row - 1][col + 1] = Space.PeoSpecialMove
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
                newBoard[row - 1][col] = Space.PeoSpecialMove
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
                    newBoard[row + 1][col - 1] = Space.PeoSpecialMove
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
                    newBoard[row + 1][col + 1] = Space.PeoSpecialMove
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
                newBoard[row + 1][col] = Space.PeoSpecialMove
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

const peoSaveKing = (row, col, oldMoveBoard, imageName, imageBoard) => {
    const newBoard = peoNormalMove(row, col, oldMoveBoard, imageName, imageBoard)

    if (imageName == Sides.White && row - 1 >= 0) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row - 1][col - 1] == Space.PeoSpecialMove || newBoard[row - 1][col - 1] == Space.Kill || newBoard[row - 1][col - 1] == Space.KillKing) {
                newBoard[row - 1][col - 1] = pieceProtect(row - 1, col - 1, newBoard, [row, col], imageBoard)
            }
        }
        
        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == Space.PeoSpecialMove || newBoard[row - 1][col + 1] == Space.Kill || newBoard[row - 1][col + 1] == Space.KillKing) {
                newBoard[row - 1][col + 1] = pieceProtect(row - 1, col + 1, newBoard, [row, col], imageBoard)
            }
        }

        // Move
        if (row == 6) {
            let oldValue = newBoard[row - 1][col]

            if (newBoard[row - 1][col] == Space.CanMove) {
                newBoard[row - 1][col] = pieceProtect(row - 1, col, newBoard, [row, col], imageBoard)
            }

            if ((oldValue == Space.CanMove && newBoard[row - 1][col] == Space.Empty) && newBoard[row - 2][col] == Space.CanMove) {
                newBoard[row - 2][col] = pieceProtect(row - 2, col, newBoard, [row, col], imageBoard)
            }
            else if (newBoard[row - 2][col] != Space.Fill) {
                newBoard[row - 2][col] = Space.Empty
            }
        }
        else {
            if (newBoard[row - 1][col] == Space.PeoSpecialMove || newBoard[row - 1][col] == Space.CanMove) {
                newBoard[row - 1][col] = pieceProtect(row - 1, col, newBoard, [row, col], imageBoard)
            }
        }
    }
    else if (imageName == Sides.Black && row + 1 <= newBoard.length - 1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == Space.PeoSpecialMove || newBoard[row + 1][col - 1] == Space.Kill || newBoard[row + 1][col - 1] == Space.KillKing) {
                newBoard[row + 1][col - 1] = pieceProtect(row + 1, col - 1, newBoard, [row, col], imageBoard)
            }
        }

        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == Space.PeoSpecialMove || newBoard[row + 1][col + 1] == Space.Kill || newBoard[row + 1][col + 1] == Space.KillKing) {
                newBoard[row + 1][col + 1] = pieceProtect(row + 1, col + 1, newBoard, [row, col], imageBoard)
            }
        }

        // Move
        if (row == 1) {
            let oldValue = newBoard[row + 1][col]

            if (newBoard[row + 1][col] == Space.CanMove) {
                newBoard[row + 1][col] = pieceProtect(row + 1, col, newBoard, [row, col], imageBoard)
            }

            if ((oldValue == Space.CanMove && newBoard[row + 1][col] == Space.Empty) && newBoard[row + 2][col] == Space.CanMove) {
                newBoard[row + 2][col] = pieceProtect(row + 2, col, newBoard, [row, col], imageBoard)
            }
            else if (newBoard[row + 2][col] != Space.Fill) {
                newBoard[row + 2][col] = Space.Empty
            }
        }
        else {
            if (newBoard[row + 1][col] == Space.PeoSpecialMove || newBoard[row + 1][col] == Space.CanMove) {
                newBoard[row + 1][col] = pieceProtect(row + 1, col, newBoard, [row, col], imageBoard)
            }
        }
    }

    return newBoard
}
