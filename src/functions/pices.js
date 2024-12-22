import { moveAlfil } from "./alfil"
import { copyBoard, deleteCheckSpaces, deleteMoveSpaces, getImage, ImageBoard } from "./board"
import { MovingPiece, Space } from "../constants"
import { movePeo, transformPeo } from "./peo"
import { moveTower } from "./tower"
import { moveKing } from "./king"
import { moveHorse } from "./horse"
import { getCheck } from "./checkMove"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn, showTransformModal) => {
    let newBoard = copyBoard(oldBoard)

    if (oldBoard[row][col] == Space.Fill || oldBoard[row][col] == Space.King) {
        const imagePath = getImage(row, col).split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        switch (imagePath[2]) {
            case "peo.png":
                newBoard = movePeo(row, col, newBoard, imagePath[1])
                break
            case "torre.png":
                newBoard = moveTower(row, col, newBoard, imagePath[1])
                break
            case "alfil.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1])
                break
            case "reina.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1])
                newBoard = moveTower(row, col, newBoard, imagePath[1])
                break
            case "rei.png":
                newBoard = moveKing(row, col, newBoard, imagePath[1])
                break
            case "cavall.png":
                newBoard = moveHorse(row, col, newBoard, imagePath[1])
                break
            default:
                break
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.CanMove || oldBoard[row][col] == Space.Kill || oldBoard[row][col] == Space.SpecialMove || oldBoard[row][col] == Space.KillKing) {
        let piece = MovingPiece[0][0].split('/')

        ImageBoard[row][col] = MovingPiece[0][0]
        ImageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''
        
        newBoard[row][col] = MovingPiece[0][3]
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = Space.Empty

        MovingPiece[0][0] = ''
        
        if (oldBoard[row][col] == Space.SpecialMove) {
            transformPeo(changeTurn, showTransformModal)
        }
        else {
            changeTurn()
        }

        console.log(piece)

        let check = getCheck(row, col, piece[2], newBoard, piece[1])

        if (check != false) {
            newBoard[check[0]][check[1]] = Space.Check
        }
        else {
            newBoard = deleteCheckSpaces(newBoard)
        }

        updateBoard(newBoard)
    }
}