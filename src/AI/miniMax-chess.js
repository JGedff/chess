import { Chess } from 'chess.js';

const chess = new Chess();
const pieceValues = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 1000 };

function evaluateBoard(board) {
    let evaluation = 0;
    for (let square of board) {
        for (let piece of square) {
            if (piece) {
                const value = pieceValues[piece.type] || 0;
                evaluation += piece.color === 'w' ? value : -value;
            }
        }
    }
    return evaluation;
}

function minimax(depth, isMaximizing, alpha, beta) {
    if (depth === 0 || chess.isGameOver()) {
        return evaluateBoard(chess.board());
    }

    let bestValue = isMaximizing ? -Infinity : Infinity;
    let moves = chess.moves();
    
    for (let move of moves) {
        chess.move(move);
        let value = minimax(depth - 1, !isMaximizing, alpha, beta);
        chess.undo();

        if (isMaximizing) {
            bestValue = Math.max(bestValue, value);
            alpha = Math.max(alpha, value);
        } else {
            bestValue = Math.min(bestValue, value);
            beta = Math.min(beta, value);
        }

        if (beta <= alpha) break;
    }
    return bestValue;
}

function findBestMove(depth) {
    let bestMove = null;
    let bestValue = -Infinity;
    let alpha = -Infinity
    let beta = Infinity;
    let moves = chess.moves({ verbose: true });
    
    for (let move of moves) {
        chess.move(move.san);
        let moveValue = minimax(depth - 1, false, alpha, beta);
        chess.undo();

        if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = move;
        }
    }
    return bestMove;
}

export function getBestMove(depth = 3) {
    const move = findBestMove(depth);

    return [[getNumPos(move.from[1]), getLetterPos(move.from[0])] , [getNumPos(move.to[1]), getLetterPos(move.to[0])]]
}

export const updateMove = (oldPos, newPos) => {
    const oldRow = getPosLetter(oldPos[1])
    const newRow = getPosLetter(newPos[1])

    const oldCol = getPosNum(oldPos[0])
    const newCol = getPosNum(newPos[0])

    chess.move({ from: oldRow + oldCol, to: newRow + newCol })
}

const getPosLetter = (num) => {
    switch (num) {
        case 0:
            return 'a'
        case 1:
            return 'b'
        case 2:
            return 'c'
        case 3:
            return 'd'
        case 4:
            return 'e'
        case 5:
            return 'f'
        case 6:
            return 'g'
        case 7:
            return 'h'
    }
}

const getLetterPos = (letter) => {
    switch (letter) {
        case 'a':
            return 0
        case 'b':
            return 1
        case 'c':
            return 2
        case 'd':
            return 3
        case 'e':
            return 4
        case 'f':
            return 5
        case 'g':
            return 6
        case 'h':
            return 7
    }
}

const getPosNum = (num) => {
    switch (num) {
        case 0:
            return 8
        case 1:
            return 7
        case 2:
            return 6
        case 3:
            return 5
        case 4:
            return 4
        case 5:
            return 3
        case 6:
            return 2
        case 7:
            return 1
    }
}

const getNumPos = (num) => {
    switch (num) {
        case '8':
            return 0
        case '7':
            return 1
        case '6':
            return 2
        case '5':
            return 3
        case '4':
            return 4
        case '3':
            return 5
        case '2':
            return 6
        case '1':
            return 7
    }
}
