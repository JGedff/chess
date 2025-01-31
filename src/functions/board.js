import { Space } from "../constants"

export const ImageBoard = [
    ["/black/tower.png","/black/horse.png","/black/bishop.png","/black/queen.png","/black/king.png","/black/bishop.png","/black/horse.png","/black/tower.png"],
    ["/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png"],
    ["/white/tower.png","/white/horse.png","/white/bishop.png","/white/queen.png","/white/king.png","/white/bishop.png","/white/horse.png","/white/tower.png"],
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

export const copyBoard = (board) => {
    const newBoard = []

    for (let h = 0; h < board.length; h++) {
        const row = board[h]
        let newRow = []
        
        for (let w = 0; w < row.length; w++) {
            newRow.push(row[w])
        }

        newBoard.push(newRow)
    }

    return newBoard
}

export const deleteCheckSpaces = (board) => {
    let newBoard = copyBoard(board)
    
    for (let h = 0; h < board.length; h++) {
        const row = board[h]
        
        for (let w = 0; w < row.length; w++) {
            const space = row[w]

            if (space == Space.Check) {
                newBoard[h][w] = Space.King
            }
        }
    }

    return newBoard
}

export const deleteMoveSpaces = (board) => {
    let newBoard = copyBoard(board)

    for (let h = 0; h < board.length; h++) {
        const row = board[h]
        
        for (let w = 0; w < row.length; w++) {
            const space = row[w]
            
            if (space == Space.CanMove || space == Space.PawnSpecialMove) {
                newBoard[h][w] = Space.Empty
            }
            else if (space == Space.Kill) {
                newBoard[h][w] = Space.Fill
            }
            else if (space == Space.KillKing) {
                newBoard[h][w] = Space.Check
            }
        }
    }

    return newBoard
}

export const haveSameValues = (newArray, arrayToCheck) => {
    for (let x = 0; x < newArray.length; x++) {
        for (let y = 0; y < newArray[x].length; y++) {
            if (newArray[x][y] != arrayToCheck[x][y]) {
                return false
            }
        }
    }

    return true
}

export const combineBoards = (board1, board2) => {
    const newBoard = board1

    for (let x = 0; x < board2.length; x++) {
        for (let y = 0; y < board2[x].length; y++) {
            if (board2[x][y] != Space.Empty && board2[x][y] != Space.Fill && board2[x][y] != Space.King) {
                newBoard[x][y] = board2[x][y]
            }
        }
    }

    return newBoard
}