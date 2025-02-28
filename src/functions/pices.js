import { combineBoards, copyBoard, deleteCheckSpaces, deleteMoveSpaces } from "./board"
import { getAllKingCheck, moveKingOutOfCheck } from "./king"
import { MovingPiece, Space } from "../constants"
import { movePawn } from "./pawn"
import { moveBishop } from "./bishop"
import { moveTower } from "./tower"
import { moveHorse } from "./horse"
import { showMoves } from "./checkMove"
import { updateMove } from "../AI/miniMax-chess"
import { moveQueen } from "./queen"
import { AI } from "../AI"

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn, showTransformModal, oldImageBoard, updateImageBoard) => {
    let newBoard = copyBoard(oldBoard)
    let imageBoard = copyBoard(oldImageBoard)

    const [side, piece] = imageBoard[row][col]
    const oldValue = oldBoard[row][col]

    if (oldValue == Space.Fill || oldValue == Space.King) {
        deleteMoveSpaces(newBoard, imageBoard)

        MovingPiece[0] = [side, piece]
        MovingPiece[1] = row
        MovingPiece[2] = col
        MovingPiece[3] = newBoard[row][col]

        switch (piece) {
            case "pawn":
                movePawn(row, col, newBoard, side, imageBoard)
                break
            case "tower":
                moveTower(row, col, newBoard, side, imageBoard)
                break
            case "bishop":
                moveBishop(row, col, newBoard, side, imageBoard)
                break
            case "queen":
                moveQueen(row, col, newBoard, side, imageBoard)
                break
            case "king":
                moveKingOutOfCheck(row, col, newBoard, imageBoard)
                break
            case "horse":
                moveHorse(row, col, newBoard, side, imageBoard)
                break
            default:
                break
        }

        updateBoard(newBoard)
    }
    else if (oldValue == Space.CanMove || oldValue == Space.Kill || oldValue == Space.PawnSpecialMove || oldValue == Space.KillKing) {
        deleteMoveSpaces(newBoard, imageBoard)

        if (AI.difficulty == 'Chessjs') {
            updateMove([MovingPiece[1], MovingPiece[2]], [row, col]) // Update move for Chessjs
        }

        imageBoard[row][col] = MovingPiece[0]
        imageBoard[MovingPiece[1]][MovingPiece[2]] = []

        newBoard[row][col] = MovingPiece[3]
        newBoard[MovingPiece[1]][MovingPiece[2]] = Space.Empty
        
        MovingPiece[0] = []
        
        deleteCheckSpaces(newBoard)
        
        if (oldValue == Space.PawnSpecialMove) {
            showTransformModal()
        }
        else {
            newBoard = getAllKingCheck(newBoard, imageBoard)
            changeTurn()
        }
        
        updateImageBoard(imageBoard)
        updateBoard(newBoard)
    }
    else if (oldValue == Space.Check) {
        deleteMoveSpaces(newBoard, imageBoard)

        MovingPiece[0] = [side, piece]
        MovingPiece[1] = row
        MovingPiece[2] = col
        MovingPiece[3] = newBoard[row][col]

        moveKingOutOfCheck(row, col, newBoard, imageBoard)

        updateBoard(newBoard)
    }
}

export const pieceProtect = (row, col, board, oldImageBoard, oldRow, oldCol) => {
    const imageBoard = copyBoard(oldImageBoard)
    const side = imageBoard[oldRow][oldCol][0]
    const actualValue = board[row][col]

    let newBoard = copyBoard(board)
    let newValue = Space.Empty

    imageBoard[row][col] = imageBoard[oldRow][oldCol]
    imageBoard[oldRow][oldCol] = []
    
    newBoard[row][col] = newBoard[oldRow][oldCol]
    newBoard[oldRow][oldCol] = Space.Empty

    deleteCheckSpaces(newBoard)
    newBoard = getAllKingCheck(newBoard, imageBoard)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard.length; y++) {
            if (newBoard[x][y] == Space.King && imageBoard[x][y][0] == side) {
                if (actualValue == Space.PawnSpecialMove) {
                    newValue = Space.PawnSpecialMove
                }
                else if (actualValue == Space.Empty || actualValue == Space.CanMove) {
                    newValue = Space.CanMove
                }
                else {
                    newValue = Space.Kill
                }
            }
        }
    }

    if (oldImageBoard[row][col] == []) {
        newValue = Space.Empty
    }
    else if (newValue == Space.Empty && (actualValue == Space.Fill || actualValue == Space.Kill || actualValue == Space.KillKing || actualValue == Space.King)) {
        newValue = Space.Fill
    }

    return newValue
}

export const getAllPiecesMoves = (imageBoard, moveBoard, side) => {
    let newMoveBoard = copyBoard(moveBoard)
    
    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            if (imageBoard[x][y][0] == side) {
                combineBoards(newMoveBoard, showMoves(x, y, newMoveBoard, imageBoard))
            }
        }
    }

    return newMoveBoard
}
