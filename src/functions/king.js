import { copyBoard, getImage } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides } from "../constants"

const getMoveArround = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)

    for (let x = row - 1; x <= row + 1; x++) {
        if (x >= 0 && x < newBoard.length) {
            for (let y = col - 1; y <= col + 1; y++) {
                if (y >= 0 && y < newBoard.length) {
                    newBoard[x][y] = getMoveValue(newBoard[x][y], getImage(x, y), imageNameToCheck)
                }
            }
        }
    }

    return newBoard
}

export const moveKing = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides.Black) {
        return getMoveArround(row, col, oldMoveBoard, Sides.White)
    }

    return getMoveArround(row, col, oldMoveBoard, Sides.Black)
}