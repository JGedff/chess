import { copyBoard, ImageBoard } from "./board"
import { getMoveValue } from "./checkMove"
import { Sides } from "../constants"

const getMoveArround = (row, col, oldMoveBoard, imageNameToCheck) => {
    const newBoard = copyBoard(oldMoveBoard)

    for (let x = row - 1; x <= row + 1; x++) {
        if (x >= 0 && x < newBoard.length) {
            for (let y = col - 1; y <= col + 1; y++) {
                if (y >= 0 && y < newBoard.length) {
                    newBoard[x][y] = getMoveValue(newBoard[x][y], ImageBoard[x][y], imageNameToCheck)
                }
            }
        }
    }

    return newBoard
}

export const moveKing = (row, col, oldMoveBoard, imageName) => {
    if (imageName == Sides[1]) {
        return getMoveArround(row, col, oldMoveBoard, Sides[0])
    }

    return getMoveArround(row, col, oldMoveBoard, Sides[1])
}