import { Space } from "../constants"
import { copyBoard, deleteCheckSpaces, deleteMoveSpaces, getAmountPieces, haveSameValues } from "../functions/board"
import { showMoves } from "../functions/checkMove"
import { getAllKingCheck } from "../functions/king"

export const selectRandomPiece = (imageBoard, moveBoard, updateImageBoard, updateBoard, changeTurn, side, numbersChecked = []) => {
    let randomPieceNumber = Math.trunc(Math.random() * getAmountPieces(imageBoard, side))

    while (numbersChecked.includes(randomPieceNumber)) {
        randomPieceNumber = Math.trunc(Math.random() * getAmountPieces(imageBoard, side))
    }

    moveRandomPiece(imageBoard, moveBoard, randomPieceNumber, side, updateImageBoard, updateBoard, changeTurn, numbersChecked)
}

const moveRandomPiece = (imageBoard, moveBoard, number, side, updateImageBoard, updateBoard, changeTurn, numbersChecked = []) => {
    let newMoveBoard = getRandomPieceMoves(imageBoard, moveBoard, number, side)

    if (haveSameValues(moveBoard, newMoveBoard)) {
        numbersChecked.push(number)

        selectRandomPiece(imageBoard, moveBoard, updateImageBoard, updateBoard, changeTurn, side, numbersChecked)
    }
    else {
        const [newImageBoard, newBoard] = selectRandomMoveForPiece(imageBoard, newMoveBoard, number, side)

        updateImageBoard(newImageBoard)
        updateBoard(newBoard)
        changeTurn()
    }
}

const getRandomPieceMoves = (imageBoard, moveBoard, number, side) => {
    let index = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            const pieceSide = imageBoard[x][y][0]

            if (pieceSide == side && index == number) {
                return showMoves(x, y, moveBoard, imageBoard)
            }
            else if (pieceSide == side) {
                index += 1
            }
        }
    }

    return moveBoard
}

const getIndexRandomPiece = (imageBoard, number, side) => {
    let index = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard.length; y++) {
            const pieceSide = imageBoard[x][y][0]

            if (pieceSide == side && index == number) {
                return [x, y]
            }
            else if (pieceSide == side) {
                index += 1
            }
        }
    }
}

const selectRandomMoveForPiece = (imageBoard, moveBoard, number, side) => {
    let newImageBoard = copyBoard(imageBoard)
    let newMoveBoard = copyBoard(moveBoard)

    const [pieceX, pieceY] = getIndexRandomPiece(imageBoard, number, side)
    const possibleMoves = getAiPossibleMoves(moveBoard)

    const randomMovePos = Math.trunc(Math.random() * possibleMoves.length)
    const [moveX, moveY, value] = possibleMoves[randomMovePos]

    if (value == Space.PawnSpecialMove) {
        newMoveBoard[moveX][moveY] = newMoveBoard[pieceX][pieceY]
        newMoveBoard[pieceX][pieceY] = Space.Empty
    
        newImageBoard[moveX][moveY] = getRandomTransformation(side)
        newImageBoard[pieceX][pieceY] = []
    }
    else {
        newMoveBoard[moveX][moveY] = newMoveBoard[pieceX][pieceY]
        newMoveBoard[pieceX][pieceY] = Space.Empty
    
        newImageBoard[moveX][moveY] = newImageBoard[pieceX][pieceY]
        newImageBoard[pieceX][pieceY] = []
    }

    deleteMoveSpaces(newMoveBoard, newImageBoard)
    deleteCheckSpaces(newMoveBoard)

    return [newImageBoard, getAllKingCheck(newMoveBoard, newImageBoard)]
}

const getAiPossibleMoves = (moveBoard) => {
    const moves = []

    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard.length; y++) {
            const pieceValue = moveBoard[x][y]

            if (pieceValue == Space.CanMove || pieceValue == Space.Kill || pieceValue == Space.KillKing || pieceValue == Space.PawnSpecialMove) {
                moves.push([x, y, pieceValue])
            }
        }
    }

    return moves
}

const getRandomTransformation = (side) => {
    let piece = ''

    switch (Math.trunc(Math.random() * 4)) {
        case 0:
            piece = 'tower.png'
            break;
        case 1:
            piece = 'horse.png'
            break;
        case 2:
            piece = 'bishop.png'
            break;
        case 3:
            piece = 'queen.png'
            break;
        default:
            piece = 'tower.png'
            break;
    }

    return [side, piece]
}