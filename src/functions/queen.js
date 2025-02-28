import { Sides, Space } from "../constants"
import { getMoveValue } from "./checkMove"
import { pieceProtect } from "./pices"

const checkQueenMove = (row, col, moveBoard, side, oldImageBoard) => {
    let y = col - 1;
    let y2 = col + 1;

    let yBlock = false
    let y2Block = false
    let verticalBlock = false

    for (let x = row + 1; x < 8; x++) {
        let oldValue
        let newValue
        
        // Diagonal down left
        if (!yBlock && y >= 0) {
            oldValue = moveBoard[x][y]
            newValue = getMoveValue(oldValue, oldImageBoard[x][y], side)

            moveBoard[x][y] = newValue
            
            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                yBlock = true
            }
        }
        
        // Diagonal down right
        if (!y2Block && y2 < 8) {
            oldValue = moveBoard[x][y2]
            newValue = getMoveValue(oldValue, oldImageBoard[x][y2], side)

            moveBoard[x][y2] = newValue
            
            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                y2Block = true
            }
        }

        // Vertical down
        if (!verticalBlock) {
            oldValue = moveBoard[x][col]
            newValue = getMoveValue(oldValue, oldImageBoard[x][col], side)

            moveBoard[x][col] = newValue
            
            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                verticalBlock = true
            }
        }

        y--;
        y2++;
    }
    
    y = col - 1;
    y2 = col + 1;
    
    yBlock = false
    y2Block = false
    verticalBlock = false
    
    for (let x = row - 1; x >= 0; x--) {
        let oldValue
        let newValue

        // Diagonal up left
        if (!yBlock && y >= 0) {
            oldValue = moveBoard[x][y]
            newValue = getMoveValue(oldValue, oldImageBoard[x][y], side)

            moveBoard[x][y] = newValue
            
            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                yBlock = true
            }
        }

        // Diagonal up right
        if (!y2Block && y2 < 8) {
            oldValue = moveBoard[x][y2]
            newValue = getMoveValue(oldValue, oldImageBoard[x][y2], side)

            moveBoard[x][y2] = newValue

            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                y2Block = true
            }
        }

        // Vertical up
        if (!verticalBlock) {
            oldValue = moveBoard[x][col]
            newValue = getMoveValue(oldValue, oldImageBoard[x][col], side)

            moveBoard[x][col] = newValue
            
            if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
                verticalBlock = true
            }
        }

        y--;
        y2++;
    }

    for (let y = col + 1; y < moveBoard.length; y++) {
        const oldValue = moveBoard[row][y]
        const newValue = getMoveValue(oldValue, oldImageBoard[row][y], side)

        moveBoard[row][y] = newValue
        
        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }
    
    for (let y = col - 1; y >= 0; y--) {
        const oldValue = moveBoard[row][y]
        const newValue = getMoveValue(oldValue, oldImageBoard[row][y], side)

        moveBoard[row][y] = newValue
        
        if ((oldValue == newValue && oldValue != Space.CanMove) || newValue == Space.Kill || newValue == Space.King || newValue == Space.Check || newValue == Space.KillKing) {
            break
        }
    }
}

export const queenNormalMove = (row, col, moveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        checkQueenMove(row, col, moveBoard, Sides.Black, oldImageBoard)
    }
    else {
        checkQueenMove(row, col, moveBoard, Sides.White, oldImageBoard)
    }
}

export const moveQueen = (row, col, moveBoard, imageName, oldImageBoard) => {
    queenNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]
            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}