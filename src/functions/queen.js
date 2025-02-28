import { queenDirections, Sides, Space } from "../constants"
import { pieceMove, pieceProtect } from "./pices"

export const queenNormalMove = (row, col, moveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        pieceMove(row, col, moveBoard, Sides.Black, oldImageBoard, queenDirections)
    }
    else {
        pieceMove(row, col, moveBoard, Sides.White, oldImageBoard, queenDirections)
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