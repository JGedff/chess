import { moveAlfil } from "./alfil"
import { copyBoard, deleteCheckSpaces, deleteMoveSpaces, getImage, getSide, ImageBoard } from "./board"
import { MovingPiece, Space } from "../constants"
import { movePeo, transformPeo } from "./peo"
import { moveTower } from "./tower"
import { moveKing } from "./king"
import { moveHorse } from "./horse"
import { getAllKingCheck } from "./checkMove"

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
        ImageBoard[row][col] = MovingPiece[0][0]
        ImageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''
        
        newBoard[row][col] = MovingPiece[0][3]
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = Space.Empty

        MovingPiece[0][0] = ''
        
        newBoard = deleteCheckSpaces(newBoard)

        if (oldBoard[row][col] == Space.SpecialMove) {
            transformPeo(changeTurn, showTransformModal)
        }
        else {
            newBoard = getAllKingCheck(newBoard)

            changeTurn()
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.Check) {
        const imagePath = getImage(row, col).split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        newBoard = moveKingOutOfCheck(row, col, newBoard)

        updateBoard(newBoard)
    }
}

const moveKingOutOfCheck = (row, col, board) => {
    let newBoard = moveKing(row, col, board, getSide(row, col))
    
    for (let x = row - 1; x < row + 2; x++) {
        if (x >= 0 && x < newBoard.length) {
            for (let y = col - 1; y < col + 2; y++) {
                if ((y >= 0 && y < newBoard.length) && !(x == row && y == col)) {
                    if (newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.CanMove) {
                        newBoard[x][y] = secureKing(x, y, board, [row, col], newBoard[x][y])
                    }
                }
            }
        }
    }

    return newBoard
}

const secureKing = (row, col, board, kingPos, oldValue) => {
    let newBoard = copyBoard(board)
    let imageAux = ''

    newBoard[row][col] = Space.King
    newBoard[kingPos[0]][kingPos[1]] = Space.Empty

    imageAux = ImageBoard[row][col]
    ImageBoard[row][col] = ImageBoard[kingPos[0]][kingPos[1]]
    ImageBoard[kingPos[0]][kingPos[1]] = ''

    newBoard = getAllKingCheck(newBoard)

    ImageBoard[kingPos[0]][kingPos[1]] = ImageBoard[row][col]
    ImageBoard[row][col] = imageAux

    if (newBoard[row][col] != Space.Check) {
        return oldValue
    }
    else {
        if (oldValue == Space.Kill) {
            return Space.Fill
        }
        else {
            return Space.Empty
        }
    }
}