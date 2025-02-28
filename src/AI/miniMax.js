import { Sides, Space } from "../constants"
import { checkMate, showMoves } from "../functions/checkMove"

const pieceValues = {
    'tower': 5,
    'horse': 3,
    'bishop': 3,
    'queen': 9,
    'king': 0,
    'pawn': 1,
}

const moveValues = {
    0: 0,
    1: 0,
    2: 0,
    3: 2,
    4: 8,
    5: 1000,
    6: 1200,
    7: 1020,
    8: 2000,
}

const getMoves = (valueBoard) => {
    const newPositions = []

    for (let x = 0; x < valueBoard.length; x++) {
        for (let y = 0; y < valueBoard.length; y++) {
            const pieceValue = valueBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.PawnSpecialMove || pieceValue == Space.KillKing) {
                newPositions.push([x, y])
            }
        }
    }

    return newPositions
}

const getAvailableMoves = (imageBoard, valueBoard, side) => {
    const moves = []

    for (let x = 0; x < valueBoard.length; x++) {
        for (let y = 0; y < valueBoard.length; y++) {
            if (imageBoard[x][y][0] == side) {
                const newMoveBoard = showMoves(x, y, valueBoard, imageBoard)

                const arrayPositions = getMoves(newMoveBoard)

                arrayPositions.forEach((newPos) => {
                    moves.push([[x, y], newPos])
                })
            }
        }
    }

    return moves
}

const applyMove = (imageBoard, valueBoard, move, auxiliar = []) => {
    const [oldPos, newPos] = move
    const [oldRow, oldCol] = oldPos
    const [newRow, newCol] = newPos

    auxiliar[0] = imageBoard[newRow][newCol]
    imageBoard[newRow][newCol] = imageBoard[oldRow][oldCol]
    imageBoard[oldRow][oldCol] = []
    
    auxiliar[1] = valueBoard[newRow][newCol]
    valueBoard[newRow][newCol] = valueBoard[oldRow][oldCol]
    valueBoard[oldRow][oldCol] = Space.Empty
}

const undoMove = (imageBoard, valueBoard, move, auxiliar) => {
    const [oldPos, newPos] = move
    const [oldRow, oldCol] = oldPos
    const [newRow, newCol] = newPos

    imageBoard[oldRow][oldCol] = imageBoard[newRow][newCol]
    imageBoard[newRow][newCol] = auxiliar[0]

    valueBoard[oldRow][oldCol] = valueBoard[newRow][newCol]
    valueBoard[newRow][newCol] = auxiliar[1]
}

const getPiecesValues = (imagePiece) => {
    const [pieceSide, piece] = imagePiece
    const value = pieceValues[piece]

    if (pieceSide == Sides.White) {
        return value
    }

    return -value
}

const getCheckValues = (pieceSide, pieceValue) => {
    const value = moveValues[pieceValue]

    if (pieceSide == Sides.White) {
        return value
    }

    return -value
}

const evaluate = (imageBoard, valueBoard) => {
    let value = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            const imagePiece = imageBoard[x][y]

            if (imagePiece.length != 0) {
                value += getPiecesValues(imagePiece)
    
                value += getCheckValues(imagePiece[0], valueBoard[x][y])
            }
        }
    }

    return value
}

const minimax = (imageBoard, valueBoard, depth, alpha, beta, minimaxing, side) => {
    if (depth <= 0 || checkMate(valueBoard, imageBoard, side)) {
        return evaluate(imageBoard, valueBoard)
    }

    let newSide = Sides.Black
    let newScore = Infinity
    
    if (minimaxing) {
        newSide = Sides.White
        newScore = -Infinity
    }

    const moves = getAvailableMoves(imageBoard, valueBoard, newSide)

    for (const move of orderMoves(moves, imageBoard, valueBoard, minimaxing, newSide)) {
        const auxiliar = [[], 0]

        applyMove(imageBoard, valueBoard, move, auxiliar)
        
        const score = minimax(imageBoard, valueBoard, depth - 1, alpha, beta, !minimaxing, newSide)
        
        undoMove(imageBoard, valueBoard, move, auxiliar)

        if (minimaxing) {
            newScore = Math.max(newScore, score)
            alpha = Math.max(alpha, score)
        }
        else {
            newScore = Math.min(newScore, score)
            beta = Math.min(beta, score)
        }

        if (beta <= alpha) {
            break
        }
    }

    return newScore
}

const orderMoves = (moves, imageBoard, valueBoard, minimaxing, side) => {
    const auxiliar = [[], 0]

    return moves.sort((a, b) => {
        applyMove(imageBoard, valueBoard, a, auxiliar)
        const scoreA = evaluate(imageBoard, valueBoard, side)
        undoMove(imageBoard, valueBoard, a, auxiliar)

        applyMove(imageBoard, valueBoard, b, auxiliar)
        const scoreB = evaluate(imageBoard, valueBoard, side)
        undoMove(imageBoard, valueBoard, b, auxiliar)

        return minimaxing ? scoreB - scoreA : scoreA - scoreB
    })
}

export const getNextMove = (imageBoard, valueBoard, depth, side) => {
    const alpha = -Infinity
    const moves = getAvailableMoves(imageBoard, valueBoard, side)
    
    let bestValue = Infinity
    let bestMove = null
    let beta = Infinity

    for (const move of orderMoves(moves, imageBoard, valueBoard, false, Sides.Black)) {
        const auxiliar = [[], 0]

        applyMove(imageBoard, valueBoard, move, auxiliar)
        
        const moveValue = minimax(imageBoard, valueBoard, depth - 1, alpha, beta, true, side)
        
        undoMove(imageBoard, valueBoard, move, auxiliar)

        if (moveValue < bestValue) {
            bestValue = moveValue
            bestMove = move
        }

        beta = Math.min(beta, moveValue)

        if (beta <= alpha) {
            break
        }
    }

    return bestMove
}