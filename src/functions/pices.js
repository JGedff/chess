import { copyBoard, deleteCheckSpaces, deleteMoveSpaces } from "./board"
import { getAllKingCheck, moveKing, moveKingOutOfCheck } from "./king"
import { MovingPiece, Space } from "../constants"
import { movePeo, transformPeo } from "./peo"
import { moveAlfil } from "./alfil"
import { moveTower } from "./tower"
import { moveHorse } from "./horse"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn, showTransformModal, oldImageBoard, updateImageBoard) => {
    let newBoard = copyBoard(oldBoard)
    let imageBoard = copyBoard(oldImageBoard)

    if (oldBoard[row][col] == Space.Fill || oldBoard[row][col] == Space.King) {
        const imagePath = imageBoard[row][col].split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        switch (imagePath[2]) {
            case "peo.png":
                newBoard = movePeo(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "torre.png":
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "alfil.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "reina.png":
                newBoard = moveAlfil(row, col, newBoard, imagePath[1], imageBoard)
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "rei.png":
                newBoard = moveKing(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "cavall.png":
                newBoard = moveHorse(row, col, newBoard, imagePath[1], imageBoard)
                break
            default:
                break
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.CanMove || oldBoard[row][col] == Space.Kill || oldBoard[row][col] == Space.PeoSpecialMove || oldBoard[row][col] == Space.KillKing) {
        imageBoard[row][col] = MovingPiece[0][0]
        imageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''

        updateImageBoard(imageBoard)

        newBoard[row][col] = MovingPiece[0][3]
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = Space.Empty

        MovingPiece[0][0] = ''
        
        newBoard = deleteCheckSpaces(newBoard)

        if (oldBoard[row][col] == Space.PeoSpecialMove) {
            transformPeo(changeTurn, showTransformModal)
        }
        else {
            newBoard = getAllKingCheck(newBoard, imageBoard)
            changeTurn()
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.Check) {
        const imagePath = imageBoard[row][col].split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        newBoard = moveKingOutOfCheck(row, col, newBoard, imageBoard)

        updateBoard(newBoard)
    }
}
