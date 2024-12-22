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

export const deleteMoveSpaces = (board) => {
    let newBoard = copyBoard(board)

    for (let h = 0; h < board.length; h++) {
        const row = board[h]
        
        for (let w = 0; w < row.length; w++) {
            const space = row[w]
            
            if (space == 2 || space == 4) {
                newBoard[h][w] = 0
            }
            else if (space == 3) {
                newBoard[h][w] = 1
            }
            else if (space == 6) {
                newBoard[h][w] = 5
            }
        }
    }

    return newBoard
}

// 0 Empty
// 1 Fill
// 2 Move
// 3 Kill
// 4 Special move
// 5 King
// 6 Kill king
// 7 Check

export const MoveBoard = [
    [1,1,1,1,5,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,5,1,1,1],
]

export const getImage = (row, col) => {
    return ImageBoard[row][col]
}

export const getSide = (row, col) => {
    return ImageBoard[row][col].split('/')[1]
}
