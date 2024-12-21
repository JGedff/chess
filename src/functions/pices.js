import { moveAlfil } from "./alfil"
import { copyBoard, deleteMoveSpaces, getImage, ImageBoard } from "./board"
import { MovingPiece } from "../constants"
import { movePeo } from "./peo"
import { moveTower } from "./tower"
import { moveKing } from "./king"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn) => {
    let newBoard = copyBoard(oldBoard)

    if (oldBoard[row][col] == 1 || oldBoard[row][col] == 5) {
        const imagePath = getImage(row, col).split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        switch (imagePath[2]) {
            case "peo.png":
                newBoard = movePeo(row, col, newBoard, imagePath[1])

                updateBoard(newBoard)
                break
            case "torre.png":
                newBoard = moveTower(row, col, newBoard, imagePath[1])

                updateBoard(newBoard)
                break
            case "alfil.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1])

                updateBoard(newBoard)
                break
            case "reina.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1])
                newBoard = moveTower(row, col, newBoard, imagePath[1])

                updateBoard(newBoard)
                break
            case "rei.png":
                newBoard = moveKing(row, col, newBoard, imagePath[1])

                updateBoard(newBoard)
                break
            default:
                break
        }
    }
    else if (oldBoard[row][col] == 2 || oldBoard[row][col] == 3 || oldBoard[row][col] == 4 || oldBoard[row][col] == 6) {
        ImageBoard[row][col] = MovingPiece[0][0]
        ImageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''

        newBoard[row][col] = MovingPiece[0][3]
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = 0
        
        MovingPiece[0][0] = ''

        updateBoard(newBoard)
        changeTurn()
    }
}