import { copyBoard, deleteCheckSpaces, deleteMoveSpaces } from "./board"
import { getAllKingCheck, moveKing, moveKingOutOfCheck } from "./king"
import { MovingPiece, Space } from "../constants"
import { movePawn, transformPawn } from "./pawn"
import { moveBishop } from "./bishop"
import { moveTower } from "./tower"
import { moveHorse } from "./horse"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn, showTransformModal, oldImageBoard, updateImageBoard) => {
    let newBoard = copyBoard(oldBoard)
    let imageBoard = copyBoard(oldImageBoard)

    const imagePath = imageBoard[row][col].split('/')

    if (oldBoard[row][col] == Space.Fill || oldBoard[row][col] == Space.King) {
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        switch (imagePath[2]) {
            case "pawn.png":
                newBoard = movePawn(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "tower.png":
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "bishop.png":
                newBoard = moveBishop(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "queen.png":
                newBoard = moveBishop(row, col, newBoard, imagePath[1], imageBoard)
                newBoard = moveTower(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "king.png":
                newBoard = moveKing(row, col, newBoard, imagePath[1], imageBoard)
                break
            case "horse.png":
                newBoard = moveHorse(row, col, newBoard, imagePath[1], imageBoard)
                break
            default:
                break
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.CanMove || oldBoard[row][col] == Space.Kill || oldBoard[row][col] == Space.PawnSpecialMove || oldBoard[row][col] == Space.KillKing) {
        imageBoard[row][col] = MovingPiece[0][0]
        imageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''

        updateImageBoard(imageBoard)

        newBoard[row][col] = MovingPiece[0][3]
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = Space.Empty

        MovingPiece[0][0] = ''
        
        newBoard = deleteCheckSpaces(newBoard)

        if (oldBoard[row][col] == Space.PawnSpecialMove) {
            transformPawn(changeTurn, showTransformModal)
        }
        else {
            newBoard = getAllKingCheck(newBoard, imageBoard)
            changeTurn()
        }

        updateBoard(newBoard)
    }
    else if (oldBoard[row][col] == Space.Check) {
        newBoard = deleteMoveSpaces(newBoard)

        MovingPiece[0][0] = imagePath.join('/')
        MovingPiece[0][1] = row
        MovingPiece[0][2] = col
        MovingPiece[0][3] = newBoard[row][col]

        newBoard = moveKingOutOfCheck(row, col, newBoard, imageBoard)

        updateBoard(newBoard)
    }
}

export const pieceProtect = (row, col, board, oldPosition, oldImageBoard) => {
    const imageBoard = copyBoard(oldImageBoard)
    const side = imageBoard[oldPosition[0]][oldPosition[1]].split('/')[1]

    let newBoard = copyBoard(board)
    let newValue = Space.Empty

    imageBoard[row][col] = imageBoard[oldPosition[0]][oldPosition[1]]
    imageBoard[oldPosition[0]][oldPosition[1]] = ''
    
    newBoard[row][col] = newBoard[oldPosition[0]][oldPosition[1]]
    newBoard[oldPosition[0]][oldPosition[1]] = Space.Empty

    newBoard = deleteCheckSpaces(newBoard)
    newBoard = getAllKingCheck(newBoard, imageBoard)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (newBoard[x][y] == Space.King && imageBoard[x][y].split('/')[1] == side) {
                if (board[row][col] == Space.Empty || board[row][col] == Space.CanMove || board[row][col] == Space.PawnSpecialMove) {
                    newValue = Space.CanMove
                }
                else {
                    newValue = Space.Kill
                }
            }
        }
    }

    if (newValue == Space.Empty && (board[row][col] == Space.Fill || board[row][col] == Space.Kill || board[row][col] == Space.KillKing || board[row][col] == Space.King)) {
        newValue = Space.Fill
    }

    return newValue
}
