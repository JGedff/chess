import { copyBoard, deleteCheckSpaces } from "./board"
import { Sides, Space } from "../constants"
import { getAllKingCheck, isKingInDanger } from "./king"

export const movePeo = (row, col, oldMoveBoard, imageName, imageBoard) => {
    let newBoard = copyBoard(oldMoveBoard)

    if (isKingInDanger(newBoard, imageName, imageBoard)) {
        newBoard = peoSaveKing(row, col, newBoard, imageName, imageBoard)
    }
    else {
        newBoard = peoNormalMove(row, col, newBoard, imageName, imageBoard)
    }

    return newBoard
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
                if (row - 1 == newBoard.length - 1) {
                    newBoard[row - 1][col - 1] = Space.SpecialMove
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
                if (row - 1 == newBoard.length - 1) {
                    newBoard[row - 1][col + 1] = Space.SpecialMove
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
                newBoard[row - 1][col] = Space.SpecialMove
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
                    newBoard[row + 1][col - 1] = Space.SpecialMove
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
                    newBoard[row + 1][col + 1] = Space.SpecialMove
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
                newBoard[row + 1][col] = Space.SpecialMove
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
            if (newBoard[row - 1][col - 1] == Space.SpecialMove || newBoard[row - 1][col - 1] == Space.Kill || newBoard[row - 1][col - 1] == Space.KillKing) {
                newBoard[row - 1][col - 1] = pieceProtect(row - 1, col - 1, newBoard, [row, col], imageBoard)
            }
        }
        
        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row - 1][col + 1] == Space.SpecialMove || newBoard[row - 1][col + 1] == Space.Kill || newBoard[row - 1][col + 1] == Space.KillKing) {
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
            if (newBoard[row - 1][col] == Space.SpecialMove || newBoard[row - 1][col] == Space.CanMove) {
                newBoard[row - 1][col] = pieceProtect(row - 1, col, newBoard, [row, col], imageBoard)
            }
        }
    }
    else if (imageName == Sides.Black && row + 1 <= newBoard.length - 1) {
        // Kill
        if (col - 1 >= 0) {
            if (newBoard[row + 1][col - 1] == Space.SpecialMove || newBoard[row + 1][col - 1] == Space.Kill || newBoard[row + 1][col - 1] == Space.KillKing) {
                newBoard[row + 1][col - 1] = pieceProtect(row + 1, col - 1, newBoard, [row, col], imageBoard)
            }
        }

        if (col + 1 <= newBoard.length - 1) {
            if (newBoard[row + 1][col + 1] == Space.SpecialMove || newBoard[row + 1][col + 1] == Space.Kill || newBoard[row + 1][col + 1] == Space.KillKing) {
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
            if (newBoard[row + 1][col] == Space.SpecialMove || newBoard[row + 1][col] == Space.CanMove) {
                newBoard[row + 1][col] = pieceProtect(row + 1, col, newBoard, [row, col], imageBoard)
            }
        }
    }

    return newBoard
}

const pieceProtect = (row, col, board, oldPosition, oldImageBoard) => {
    const imageBoard = copyBoard(oldImageBoard)
    const side = imageBoard[oldPosition[0]][oldPosition[1]].split('/')[1]

    let newBoard = copyBoard(board)
    let newValue = Space.Empty

    imageBoard[row][col] = imageBoard[oldPosition[0]][oldPosition[1]]
    imageBoard[oldPosition[0]][oldPosition[1]] = ''
    
    newBoard[row][col] = newBoard[oldPosition[0]][oldPosition[1]]
    newBoard[oldPosition[0]][oldPosition[1]] = Space.Empty

    newBoard = deleteCheckSpaces(newBoard)
    newBoard = getAllKingCheck(newBoard, imageBoard)

    console.log(newBoard)
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (newBoard[x][y] == Space.King && imageBoard[x][y].split('/')[1] == side) {
                console.log('saved')
                if (board[row][col] == Space.Empty || board[row][col] == Space.CanMove || board[row][col] == Space.SpecialMove) {
                    newValue = Space.CanMove
                }
                else {
                    newValue = Space.Kill
                }
            }
        }
    }

    return newValue
}
