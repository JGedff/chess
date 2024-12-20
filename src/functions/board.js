const ImageBoard = [
    ["/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png"],
    ["/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png"],
    ["/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png"],
]
/* const ImageBoard = [
    ["/black/torre.png","/black/cavall.png","/black/alfil.png","/black/reina.png","/black/rei.png","/black/alfil.png","/black/cavall.png","/black/torre.png"],
    ["/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png"],
    ["/white/torre.png","/white/cavall.png","/white/alfil.png","/white/reina.png","/white/rei.png","/white/alfil.png","/white/cavall.png","/white/torre.png"],
] */

const copyBoard = (board) => {
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

const MovingPiece = [
    ['', 0, 0],
    ['', 0, 0]
]

const deleteMoveSpaces = (board) => {
    let newBoard = copyBoard(board)

    for (let h = 0; h < board.length; h++) {
        const row = board[h];
        
        for (let w = 0; w < row.length; w++) {
            const space = row[w];
            
            if (space == 2 || space == 4) {
                newBoard[h][w] = 0
            }
            else if (space == 3) {
                newBoard[h][w] = 1
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

export const MoveBoard = [
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
]

export const getImage = (row, col) => {
    return ImageBoard[row][col]
}

export const handleMovePiece = (row, col, oldBoard, updateBoard, changeTurn) => {
    let newBoard = copyBoard(oldBoard)

    if (oldBoard[row][col] == 1) {
        let imagePath = ImageBoard[row][col].split('/')
        
        newBoard = deleteMoveSpaces(newBoard)

        switch (imagePath[2]) {
            case "peo.png":
                MovingPiece[0][0] = imagePath.join('/')
                MovingPiece[0][1] = row
                MovingPiece[0][2] = col

                if (imagePath[1] == 'white' && row - 1 >= 0) {
                    if (col - 1 >= 0) {
                        if (newBoard[row - 1][col - 1] == 1 && ImageBoard[row - 1][col - 1].split('/')[1] == 'black') {
                            newBoard[row - 1][col - 1] = 3
                        }
                    }

                    if (col + 1 <= oldBoard.length - 1) {
                        if (newBoard[row - 1][col + 1] == 1 && ImageBoard[row - 1][col + 1].split('/')[1] == 'black') {
                            newBoard[row - 1][col + 1] = 3
                        }
                    }

                    if (row - 1 == 0) {
                        if (oldBoard[row - 1][col] != 1) {
                            newBoard[row - 1][col] = 4
                        }
                    }
                    else if (row == 6) {
                        if (oldBoard[row - 1][col] != 1 && oldBoard[row - 2][col] != 1) {
                            newBoard[row - 1][col] = 2
                            newBoard[row - 2][col] = 2
                        }
                        else if (oldBoard[row - 1][col] != 1) {
                            newBoard[row - 1][col] = 2
                        }
                    }
                    else {
                        if (oldBoard[row - 1][col] != 1) {
                            newBoard[row - 1][col] = 2
                        }
                    }
                }
                else if (imagePath[1] == 'black' && row + 1 <= oldBoard.length -1) {
                    if (col - 1 >= 0) {
                        if (newBoard[row + 1][col - 1] == 1 && ImageBoard[row + 1][col - 1].split('/')[1] == 'white') {
                            newBoard[row + 1][col - 1] = 3
                        }
                    }

                    if (col + 1 <= oldBoard.length - 1) {
                        if (newBoard[row + 1][col + 1] == 1 && ImageBoard[row + 1][col + 1].split('/')[1] == 'white') {
                            newBoard[row + 1][col + 1] = 3
                        }
                    }

                    if (row + 1 == oldBoard.length - 1) {
                        if (oldBoard[row + 1][col] != 1) {
                            newBoard[row + 1][col] = 4
                        }
                    }
                    else if (row == 1) {
                        if (oldBoard[row + 1][col] != 1 && oldBoard[row + 2][col] != 1) {
                            newBoard[row + 1][col] = 2
                            newBoard[row + 2][col] = 2
                        }
                        else if (oldBoard[row + 1][col] != 1) {
                            newBoard[row + 1][col] = 2
                        }
                    }
                    else {
                        if (oldBoard[row + 1][col] != 1) {
                            newBoard[row + 1][col] = 2
                        }
                    }
                }

                updateBoard(newBoard)
                break;
            default:
                break;
        }
    }
    else if (oldBoard[row][col] == 2 || oldBoard[row][col] == 3) {
        ImageBoard[row][col] = MovingPiece[0][0]
        ImageBoard[MovingPiece[0][1]][MovingPiece[0][2]] = ''
        
        newBoard[row][col] = 1
        newBoard = deleteMoveSpaces(newBoard)
        newBoard[MovingPiece[0][1]][MovingPiece[0][2]] = 0
        
        MovingPiece[0][0] = ''

        updateBoard(newBoard)
        changeTurn()
    }
}