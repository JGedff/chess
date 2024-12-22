import { Space } from "../constants"
import { moveAlfil } from "./alfil"
import { copyBoard } from "./board"
import { moveHorse } from "./horse"
import { moveKing } from "./king"
import { movePeo } from "./peo"
import { moveTower } from "./tower"

export const getMoveValue = (value, imagePath, imageToCheck) => {
    let image = ''
    
    if (imagePath != '' && imagePath != undefined) {
        image = imagePath.split('/')[1]
    }

    if (value == Space.Empty) {
        return Space.CanMove
    }
    else if (value == Space.Fill && image == imageToCheck) {
        return Space.Kill
    }
    else if ((value == Space.King || value == Space.Check) && image == imageToCheck) {
        return Space.KillKing
    }

    return value
}

export const getCheck = (row, col, piece, board, imageToCheck) => {
    let newBoard = copyBoard(board)

    switch (piece) {
        case "peo.png":
            newBoard = movePeo(row, col, board, imageToCheck)
            break
        case "torre.png":
            newBoard = moveTower(row, col, board, imageToCheck)
            break
        case "alfil.png":
            newBoard = moveAlfil(row, col, board, imageToCheck)
            break
        case "reina.png":
            newBoard = moveAlfil(row, col, board, imageToCheck)
            newBoard = moveTower(row, col, newBoard, imageToCheck)
            break
        case "rei.png":
            newBoard = moveKing(row, col, board, imageToCheck)
            break
        case "cavall.png":
            newBoard = moveHorse(row, col, board, imageToCheck)
            break
        default:
            break
    }
    

    for (let x = 0; x < newBoard.length; x++) {
        const column = newBoard[x];
        
        for (let y = 0; y < column.length; y++) {
            const value = column[y];
            
            if (value == Space.KillKing) {
                return [x, y]
            }
        }
    }

    return false
}