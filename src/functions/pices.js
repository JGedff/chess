import { moveAlfil } from "./alfil"
import { copyBoard, deleteMoveSpaces, ImageBoard, MovingPiece } from "./board"
import { movePeo } from "./peo"
import { moveTower } from "./tower"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn) => {
    let newBoard = copyBoard(oldBoard)

    if (oldBoard[row][col] == 1) {
        let imagePath = ImageBoard[row][col].split('/')
        
        newBoard = deleteMoveSpaces(newBoard)
    
        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col

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
            default:
                break
        }
    }
    else if (oldBoard[row][col] == 2 || oldBoard[row][col] == 3 || oldBoard[row][col] == 4) {
        ImageBoard[row][col] = MovingPiece[0][0]
        ImageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''
        
        newBoard[row][col] = 1
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = 0
        
        MovingPiece[0][0] = ''

        updateBoard(newBoard)
        changeTurn()
    }
}