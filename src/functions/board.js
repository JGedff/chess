import { Space } from "../constants"

export const ImageBoard = [
    [["black", "tower"],["black", "horse"],["black", "bishop"],["black", "queen"],["black", "king"],["black", "bishop"],["black", "horse"],["black", "tower"]],
    [["black", "pawn"],["black", "pawn"],["black", "pawn"],["black", "pawn"],["black", "pawn"],["black", "pawn"],["black", "pawn"],["black", "pawn"]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [["white", "pawn"],["white", "pawn"],["white", "pawn"],["white", "pawn"],["white", "pawn"],["white", "pawn"],["white", "pawn"],["white", "pawn"]],
    [["white", "tower"],["white", "horse"],["white", "bishop"],["white", "queen"],["white", "king"],["white", "bishop"],["white", "horse"],["white", "tower"]]
]

export const MoveBoard = [
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.King, Space.Fill, Space.Fill, Space.Fill],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.King, Space.Fill, Space.Fill, Space.Fill],
]

export const copyBoard = (board = [[]]) => {
    const newBoard = []
    
    board.forEach((row) => {
        const newRow = []
        
        row.forEach((val) => {
            newRow.push(val)
        })
        
        newBoard.push(newRow)
    })

    return newBoard
}

export const deleteCheckSpaces = (board) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (board[x][y] == Space.Check) {
                board[x][y] = Space.King
            }
        }
    }
}

export const deleteMoveSpaces = (board, imageBoard) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const space = board[x][y]

            if (space == Space.CanMove) {
                board[x][y] = Space.Empty
            }
            else if (space == Space.Kill) {
                board[x][y] = Space.Fill
            }
            else if (space == Space.PawnSpecialMove) {
                if (imageBoard[x][y].length != 0) {
                    board[x][y] = Space.Fill
                }
                else {
                    board[x][y] = Space.Empty
                }
            }
            else if (space == Space.KillKing) {
                board[x][y] = Space.Check
            }
        }
    }
}

export const haveSameValues = (newArray, arrayToCheck) => {
    for (let x = 0; x < newArray.length; x++) {
        for (let y = 0; y < newArray.length; y++) {
            if (newArray[x][y] != arrayToCheck[x][y]) {
                return false
            }
        }
    }

    return true
}

export const combineBoards = (board1, board2) => {
    for (let x = 0; x < board2.length; x++) {
        for (let y = 0; y < board2.length; y++) {
            const pieceValue2Board = board2[x][y]

            if (pieceValue2Board == Space.CanMove || pieceValue2Board == Space.Kill || pieceValue2Board == Space.KillKing || pieceValue2Board == Space.PawnSpecialMove) {
                board1[x][y] = pieceValue2Board
            }
        }
    }
}

export const getAmountPieces = (imageBoard, side) => {
    let count = 0

    for (const row of imageBoard) {
        for (const piece of row) {
            if (piece[0] == side) {
                count += 1
            }
        }
    }

    return count
}
