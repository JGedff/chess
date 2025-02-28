import { Sides, Space, towerDirections } from "../constants"
import { pieceMove, pieceProtect } from "./pices"

export const towerNormalMove = (row, col, moveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        pieceMove(row, col, moveBoard, Sides.White, imageBoard, towerDirections)
    } else {
        pieceMove(row, col, moveBoard, Sides.Black, imageBoard, towerDirections)
    }
}

export const moveTower = (row, col, moveBoard, imageName, oldImageBoard) => {
    towerNormalMove(row, col, moveBoard, imageName, oldImageBoard)
    
    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing) {
                moveBoard[x][y] = pieceProtect(x, y, moveBoard, oldImageBoard, row, col)
            }
        }
    }
}
