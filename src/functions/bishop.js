import { bishopDirections, Sides, Space } from "../constants"
import { pieceMove, pieceProtect } from "./pices"

export const bishopNormalMove = (row, col, moveBoard, imageName, oldImageBoard) => {
    if (imageName == Sides.White) {
        pieceMove(row, col, moveBoard, Sides.Black, oldImageBoard, bishopDirections)
    }
    else {
        pieceMove(row, col, moveBoard, Sides.White, oldImageBoard, bishopDirections)
    }
}

export const moveBishop = (row, col, moveBoard, imageName, oldImageBoard) => {
    bishopNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}
