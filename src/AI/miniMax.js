import { Sides, Space } from "../constants"
import { checkMate, showMoves } from "../functions/checkMove"

const getMoves = (valueBoard) => {
    const newPositions = []

    for (let x = 0; x < valueBoard.length; x++) {
        for (let y = 0; y < valueBoard.length; y++) {            
            const pieceValue = valueBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing || pieceValue == Space.PawnSpecialMove) {
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
    let val = 0

    if (imagePiece != []) {
        const [pieceSide, piece] = imagePiece
    
        if (pieceSide == Sides.White) {
            if (piece == 'pawn') {
                val += 1
            }
            else if (piece == 'horse' || piece == 'bishop') {
                val += 3
            }
            else if (piece == 'tower') {
                val += 5
            }
            else if (piece == 'queen') {
                val += 9
            }
            else if (piece == 'king') {
                val += 1000
            }
        }
        else {
            if (piece == 'pawn') {
                val -= 1
            }
            else if (piece == 'horse' || piece == 'bishop') {
                val -= 3
            }
            else if (piece == 'tower') {
                val -= 5
            }
            else if (piece == 'queen') {
                val -= 9
            }
            else if (piece == 'king') {
                val -= 1000
            }
        }
    }

    return val
}

const getCheckValues = (imagePiece, pieceValue) => {
    let val = 0

    if (pieceValue != 0) {
        const imageSide = imagePiece[0]

        if (imageSide == Sides.White) {
            switch (pieceValue) {
                case Space.Check:
                    val -= 100
                    break;
                case Space.CheckMate:
                    val -= 200
                    break;
            }
        }
        else {
            switch (pieceValue) {
                case Space.Check:
                    val += 100
                    break;
                case Space.CheckMate:
                    val += 200
                    break;
            }
        }
    }

    return val
}

const evaluate = (imageBoard, valueBoard) => {
    let value = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            const imagePiece = imageBoard[x][y]

            value += getPiecesValues(imagePiece)

            value += getCheckValues(imagePiece, valueBoard[x][y])
        }
    }

    return value
}

const minimax = (imageBoard, valueBoard, depth, alpha, beta, minimaxing, side) => {
    if (depth <= 0 || checkMate(valueBoard, imageBoard, side)) {
        return evaluate(imageBoard, valueBoard)
    }

    let newSide = Sides.Black

    if (side == Sides.Black) {
        newSide = Sides.White
    }

    let newScore = minimaxing ? -Infinity : Infinity
    let moves = getAvailableMoves(imageBoard, valueBoard, newSide)
    
    moves = orderMoves(moves, imageBoard, valueBoard, minimaxing, newSide)

    for (const move of moves) {
        let auxiliar = ['', 0]

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

const orderMoves = (moves, imageBoard, valueBoard, minimax, side) => {
    let auxiliar = ['', 0]

    return moves.sort((a, b) => {
        applyMove(imageBoard, valueBoard, a, auxiliar)
        const scoreA = evaluate(imageBoard, valueBoard, side)
        undoMove(imageBoard, valueBoard, a, auxiliar)

        applyMove(imageBoard, valueBoard, b, auxiliar)
        const scoreB = evaluate(imageBoard, valueBoard, side)
        undoMove(imageBoard, valueBoard, b, auxiliar)

        return minimax ? scoreB - scoreA : scoreA - scoreB
    })
}

export const getNextMove = (imageBoard, valueBoard, depth, side) => {
    let bestValue = -Infinity
    let alpha = -Infinity
    let bestMove = null
    let beta = Infinity

    for (let move of getAvailableMoves(imageBoard, valueBoard, side)) {
        let auxiliar = ['', 0]

        applyMove(imageBoard, valueBoard, move, auxiliar)
        
        const moveValue = minimax(imageBoard, valueBoard, depth - 1, alpha, beta, false, side)
        
        undoMove(imageBoard, valueBoard, move, auxiliar)

        if (moveValue > bestValue) {
            bestValue = moveValue
            bestMove = move
        }

        alpha = Math.max(alpha, moveValue)
    }

    return bestMove
}