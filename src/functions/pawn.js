import { Sides, Space } from "../constants"
import { pieceProtect } from "./pices"

export const pawnNormalMove = (row, col, moveBoard, imageName, imageBoard) => {
    if (imageName == Sides.White && row - 1 >= 0) {
        const nextPawnRow = moveBoard[row - 1]
        const oldImageBoardRow = imageBoard[row - 1]

        // Kill
        if (col - 1 >= 0) {
            if (nextPawnRow[col - 1] == Space.Fill && oldImageBoardRow[col - 1][0] == Sides.Black) {
                if (row - 1 == 0) {
                    moveBoard[row - 1][col - 1] = Space.PawnSpecialMove
                }
                else {
                    moveBoard[row - 1][col - 1] = Space.Kill
                }
            }
            else if ((nextPawnRow[col - 1] == Space.King || nextPawnRow[col - 1] == Space.Check) && oldImageBoardRow[col - 1][0] == Sides.Black) {
                moveBoard[row - 1][col - 1] = Space.KillKing
            }
        }

        if (col + 1 <= moveBoard.length - 1) {
            if (nextPawnRow[col + 1] == Space.Fill && oldImageBoardRow[col + 1][0] == Sides.Black) {
                if (row - 1 == 0) {
                    moveBoard[row - 1][col + 1] = Space.PawnSpecialMove
                }
                else {
                    moveBoard[row - 1][col + 1] = Space.Kill
                }
            }
            else if ((nextPawnRow[col + 1] == Space.King || nextPawnRow[col + 1] == Space.Check) && oldImageBoardRow[col + 1][0] == Sides.Black) {
                moveBoard[row - 1][col + 1] = Space.KillKing
            }
        }

        // Special Move
        if (row - 1 == 0) {
            if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row - 1][col] = Space.PawnSpecialMove
            }
        }
        else if (row == 6) { // Move
            if (nextPawnRow[col] == Space.Empty && moveBoard[row - 2][col] == Space.Empty) {
                moveBoard[row - 1][col] = Space.CanMove
                moveBoard[row - 2][col] = Space.CanMove
            }
            else if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row - 1][col] = Space.CanMove
            }
        }
        else {
            if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row - 1][col] = Space.CanMove
            }
        }
    }
    else if (imageName == Sides.Black && row + 1 <= moveBoard.length - 1) {
        const nextPawnRow = moveBoard[row + 1]
        const oldImageBoardRow = imageBoard[row + 1]

        // Kill
        if (col - 1 >= 0) {
            if (nextPawnRow[col - 1] == Space.Fill && oldImageBoardRow[col - 1][0] == Sides.White) {
                if (row + 1 == moveBoard.length - 1) {
                    moveBoard[row + 1][col - 1] = Space.PawnSpecialMove
                }
                else {
                    moveBoard[row + 1][col - 1] = Space.Kill
                }
            }
            else if ((nextPawnRow[col - 1] == Space.King || nextPawnRow[col - 1] == Space.Check) && oldImageBoardRow[col - 1][0] == Sides.White) {
                moveBoard[row + 1][col - 1] = Space.KillKing
            }
        }

        if (col + 1 <= moveBoard.length - 1) {
            if (nextPawnRow[col + 1] == Space.Fill && oldImageBoardRow[col + 1][0] == Sides.White) {
                if (row + 1 == moveBoard.length - 1) {
                    moveBoard[row + 1][col + 1] = Space.PawnSpecialMove
                }
                else {
                    moveBoard[row + 1][col + 1] = Space.Kill
                }
            }
            else if ((nextPawnRow[col + 1] == Space.King || nextPawnRow[col + 1] == Space.Check) && oldImageBoardRow[col + 1][0] == Sides.White) {
                moveBoard[row + 1][col + 1] = Space.KillKing
            }
        }

        // Special Move
        if (row + 1 == moveBoard.length - 1) {
            if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row + 1][col] = Space.PawnSpecialMove
            }
        }
        else if (row == 1) { // Move
            if (nextPawnRow[col] == Space.Empty && moveBoard[row + 2][col] == Space.Empty) {
                moveBoard[row + 1][col] = Space.CanMove
                moveBoard[row + 2][col] = Space.CanMove
            }
            else if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row + 1][col] = Space.CanMove
            }
        }
        else {
            if (nextPawnRow[col] == Space.Empty) {
                moveBoard[row + 1][col] = Space.CanMove
            }
        }
    }
}

export const movePawn = (row, col, moveBoard, imageName, oldImageBoard) => {
    pawnNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.PawnSpecialMove || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}
