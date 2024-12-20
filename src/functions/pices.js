import { copyBoard, deleteMoveSpaces, ImageBoard, MovingPiece } from "./board";
import { movePeo } from "./peo";

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn) => {
    let newBoard = copyBoard(oldBoard)

    if (oldBoard[row][col] == 1) {
        let imagePath = ImageBoard[row][col].split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        switch (imagePath[2]) {
            case "peo.png":
                newBoard = movePeo(row, col, newBoard)

                updateBoard(newBoard)
                break;
            default:
                break;
        }
    }
    else if (oldBoard[row][col] == 2 || oldBoard[row][col] == 3) {
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