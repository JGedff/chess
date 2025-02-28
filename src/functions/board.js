import { Space } from "../constants"

export const ImageBoard = [
    [[],[],[],[],["black", "king"],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],["white", "queen"],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],["black", "queen"],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],["white", "king"],[],[],[]]
]

export const MoveBoard = [
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.King, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.King, Space.Empty, Space.Empty, Space.Empty],
]

export const copyBoard = (board = [[]]) => {
    let newBoard = []
    
    board.forEach((row) => {
        let newRow = []
        
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

            if (space == Space.PawnSpecialMove && imageBoard[x][y] != []) {
                board[x][y] = Space.Fill
            }
            else if (space == Space.CanMove || space == Space.PawnSpecialMove) {
                board[x][y] = Space.Empty
            }
            else if (space == Space.Kill) {
                board[x][y] = Space.Fill
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

            if (pieceValue2Board != Space.Empty && pieceValue2Board != Space.Fill && pieceValue2Board != Space.King && pieceValue2Board != Space.Check) {
                board1[x][y] = pieceValue2Board
            }
        }
    }
}

export const getAmountPieces = (imageBoard, side) => {
    let count = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            if (imageBoard[x][y][0] == side) {
                count += 1
            }
        }
    }

    return count
}
