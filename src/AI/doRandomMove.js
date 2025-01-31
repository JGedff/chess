import { Sides, Space } from "../constants"
import { boardsAreEqual, copyBoard, deleteCheckSpaces, deleteMoveSpaces, getAmountPieces } from "../functions/board"
import { showMoves } from "../functions/checkMove"
import { getAllKingCheck } from "../functions/king"

export const selectRandomPiece = (imageBoard, moveBoard, updateImageBoard, updateBoard, changeTurn, numbersChecked = []) => {
    let randomPieceNumber = Math.trunc(Math.random() * getAmountPieces(imageBoard, Sides.Black))

    while (numbersChecked.includes(randomPieceNumber)) {
        randomPieceNumber = Math.trunc(Math.random() * getAmountPieces(imageBoard, Sides.Black))
    }

    moveRandomPiece(imageBoard, moveBoard, randomPieceNumber, Sides.Black, updateImageBoard, updateBoard, changeTurn, numbersChecked)
}

const moveRandomPiece = (imageBoard, moveBoard, number, side, updateImageBoard, updateBoard, changeTurn, numbersChecked = []) => {
    let newMoveBoard = getRandomPieceMoves(imageBoard, moveBoard, number, side)

    if (boardsAreEqual(moveBoard, newMoveBoard)) {
        numbersChecked.push(number)

        selectRandomPiece(imageBoard, moveBoard, updateImageBoard, updateBoard, changeTurn, numbersChecked)
    }
    else {
        const [newImageBoard, newBoard, spaceValueBeforeMoving] = selectRandomMoveForPiece(imageBoard, newMoveBoard, number, side)

        updateImageBoard(newImageBoard)
        updateBoard(newBoard)
        changeTurn()
    }
}

const getRandomPieceMoves = (imageBoard, moveBoard, number, side) => {
    let index = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard[x].length; y++) {
            if (imageBoard[x][y].split("/")[1] == side && index == number) {
                return showMoves(x, y, moveBoard, imageBoard)
            }
            else if (imageBoard[x][y].split("/")[1] == side) {
                index += 1
            }
        }
    }
}

const getIndexRandomPiece = (imageBoard, number, side) => {
    let index = 0

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard[x].length; y++) {
            if (imageBoard[x][y].split("/")[1] == side && index == number) {
                return [x, y]
            }
            else if (imageBoard[x][y].split("/")[1] == side) {
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

    newMoveBoard[moveX][moveY] = newMoveBoard[pieceX][pieceY]
    newMoveBoard[pieceX][pieceY] = 0

    newImageBoard[moveX][moveY] = newImageBoard[pieceX][pieceY]
    newImageBoard[pieceX][pieceY] = ''

    newMoveBoard = deleteMoveSpaces(newMoveBoard, newImageBoard)
    newMoveBoard = deleteCheckSpaces(newMoveBoard)

    return [newImageBoard, getAllKingCheck(newMoveBoard, newImageBoard), value]
}

const getAiPossibleMoves = (moveBoard) => {
    const moves = []

    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard[x].length; y++) {
            if (moveBoard[x][y] == Space.CanMove || moveBoard[x][y] == Space.Kill || moveBoard[x][y] == Space.KillKing || moveBoard[x][y] == Space.PawnSpecialMove) {
                moves.push([x, y, moveBoard[x][y]])
            }
        }
    }

    return moves
}