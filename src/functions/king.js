import { copyBoard } from "./board"
import { Sides, Space } from "../constants"
import { getMoveValue } from "./checkMove"
import { towerNormalMove } from "./tower"
import { moveAlfil } from "./alfil"
import { moveHorse } from "./horse"
import { peoNormalMove } from "./peo"

const getMoveArround = (row, col, oldMoveBoard, imageNameToCheck, imageBoard) => {
    const newBoard = copyBoard(oldMoveBoard)
    
    for (let x = row - 1; x <= row + 1; x++) {
        if (x >= 0 && x < newBoard.length) {
            for (let y = col - 1; y <= col + 1; y++) {
                if (y >= 0 && y < newBoard.length) {
                    newBoard[x][y] = getMoveValue(newBoard[x][y], imageBoard[x][y], imageNameToCheck)
                }
            }
        }
    }

    return newBoard
}

export const moveKing = (row, col, oldMoveBoard, imageName, imageBoard) => {
    if (imageName == Sides.Black) {
        return getMoveArround(row, col, oldMoveBoard, Sides.White, imageBoard)
    }

    return getMoveArround(row, col, oldMoveBoard, Sides.Black, imageBoard)
}

const getCheck = (row, col, piece, board, imageToCheck, imageBoard) => {
    let newBoard = copyBoard(board)

    switch (piece) {
        case "peo.png":
            newBoard = peoNormalMove(row, col, board, imageToCheck, imageBoard)
            break
        case "torre.png":
            newBoard = towerNormalMove(row, col, board, imageToCheck, imageBoard)
            break
        case "alfil.png":
            newBoard = moveAlfil(row, col, board, imageToCheck, imageBoard)
            break
        case "reina.png":
            newBoard = moveAlfil(row, col, board, imageToCheck, imageBoard)
            newBoard = towerNormalMove(row, col, newBoard, imageToCheck, imageBoard)
            break
        case "rei.png":
            newBoard = moveKing(row, col, board, imageToCheck, imageBoard)
            break
        case "cavall.png":
            newBoard = moveHorse(row, col, board, imageToCheck, imageBoard)
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

export const getAllKingCheck = (board, imageBoard) => {
    const newBoard = copyBoard(board)
    const allChecks = []

    for (let x = 0; x < newBoard.length; x++) {
        const row = newBoard[x];
        
        for (let y = 0; y < row.length; y++) {
            const pieceImage = imageBoard[x][y].split('/')
            const side = pieceImage[1]
            const piece = pieceImage[2]
            const isCheck = getCheck(x, y, piece, newBoard, side, imageBoard)

            if (isCheck != false) {
                allChecks.push(isCheck)
            }
        }
    }

    allChecks.forEach(([row, col]) => {
        newBoard[row][col] = Space.Check
    })

    return newBoard
}

export const isKingInDanger = (board, side, imageBoard) => {
    for (let x = 0; x < board.length; x++) {
        const row = board[x];
        
        for (let y = 0; y < row.length; y++) {
            if (board[x][y] == Space.Check && imageBoard[x][y].split('/')[1] == side) {
                return true
            }
        }
    }

    return false
}

export const moveKingOutOfCheck = (row, col, board, imageBoard) => {
    const newBoard = moveKing(row, col, board, imageBoard[row][col].split('/')[1], imageBoard)
    
    for (let x = row - 1; x < row + 2; x++) {
        if (x >= 0 && x < newBoard.length) {
            for (let y = col - 1; y < col + 2; y++) {
                if ((y >= 0 && y < newBoard.length) && !(x == row && y == col)) {
                    if (newBoard[x][y] == Space.Kill || newBoard[x][y] == Space.CanMove) {
                        newBoard[x][y] = secureKing(x, y, board, [row, col], newBoard[x][y], imageBoard)
                    }
                }
            }
        }
    }

    return newBoard
}

const secureKing = (row, col, board, kingPos, newValue, oldImageBoard) => {
    let newBoard = copyBoard(board)
    let imageBoard = copyBoard(oldImageBoard)

    newBoard[row][col] = Space.King
    newBoard[kingPos[0]][kingPos[1]] = Space.Empty

    imageBoard[row][col] = imageBoard[kingPos[0]][kingPos[1]]
    imageBoard[kingPos[0]][kingPos[1]] = ''

    newBoard = getAllKingCheck(newBoard, imageBoard)

    if (newBoard[row][col] == Space.King) {
        return newValue
    }
    else {
        if (newValue == Space.Kill) {
            return Space.Fill
        }
        else {
            return Space.Empty
        }
    }
}
