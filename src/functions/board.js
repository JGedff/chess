import { Space } from "../constants"

export const ImageBoard = [
    ["/black/torre.png","/black/cavall.png","/black/alfil.png","/black/reina.png","/black/rei.png","/black/alfil.png","/black/cavall.png","/black/torre.png"],
    ["/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png"],
    ["/white/torre.png","/white/cavall.png","/white/alfil.png","/white/reina.png","/white/rei.png","/white/alfil.png","/white/cavall.png","/white/torre.png"],
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
            
            if (space == Space.CanMove || space == Space.SpecialMove) {
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
