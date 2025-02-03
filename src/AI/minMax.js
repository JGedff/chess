import { Sides, Space } from "../constants"
import { copyBoard, deleteMoveSpaces } from "../functions/board"
import { showMoves } from "../functions/checkMove"

export const getNextMove = (imageBoard, moveBoard, minmax, depth) => {
    let side = ''

    if (minmax) {
        side = Sides.White
    }
    else {
        side = Sides.Black
    }

    if (depth <= 0) {
        return imageBoard, moveBoard, getMinMaxValue(imageBoard, moveBoard, minmax, side)
    }

    const moves = []

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard[x].length; y++) {
            if (imageBoard[x][y].split('/')[1] == side) {
                const newMoveBoard = showMoves(x, y, moveBoard, imageBoard)
    
                const arrayPositions = getBoardsForEachMove([x, y], newMoveBoard, imageBoard)

                for (let i = 0; i < arrayPositions.length; i++) {
                    const pos = arrayPositions[i];

                    moves.push([pos[0], deleteMoveSpaces(pos[1], pos[0]), getNextMove(pos[0], deleteMoveSpaces(pos[1], pos[0]), !minmax, depth - 1)])
                }
            }
        }
    }

    if (minmax) {
        return bestValueFrom(moves)
    }
    else {
        return worstValueFrom(moves)
    }
}

const getMinMaxValue = (imageBoard, moveBoard, minmax, side) => {
    let minMaxValue = 0

    let pieceAwayFromStart = 0
    let pawnAwayFromStart = 0

    if (!minmax) {
        pieceAwayFromStart = imageBoard.length * 0.0125
        pawnAwayFromStart = imageBoard.length * 0.25
    }

    for (let x = 0; x < imageBoard.length; x++) {
        for (let y = 0; y < imageBoard[x].length; y++) {
            minMaxValue += getPiecesValues(imageBoard[x][y], side)

            minMaxValue += getCheckValues(imageBoard[x][y], moveBoard[x][y], side)

            minMaxValue += getPositionValues(imageBoard[x][y], side, pieceAwayFromStart, pawnAwayFromStart)
        }

        if (minmax) {
            pieceAwayFromStart += 0.0125
            pawnAwayFromStart += 0.25
        }
        else {
            pieceAwayFromStart -= 0.0125
            pawnAwayFromStart -= 0.25
        }
    }

    return minMaxValue
}

const getPiecesValues = (image, side) => {
    let val = 0

    if (image != '') {
        const [, imageSide, pieceImage] = image.split('/')
        const piece = pieceImage.split('.')[0]
    
        if (imageSide == side) {
            if (piece == 'pawn') {
                val += 1
            }
            else if (piece == 'horse' || piece == 'tower' || piece == 'bishop') {
                val += 2
            }
            else if (piece == 'queen') {
                val += 5
            }
        }
        else {
            if (piece == 'pawn') {
                val -= 1
            }
            else if (piece == 'horse' || piece == 'tower' || piece == 'bishop') {
                val -= 2
            }
            else if (piece == 'queen') {
                val -= 5
            }
        }
    }

    return val
}

const getCheckValues = (imagePiece, pieceValue, side) => {
    let val = 0

    if (pieceValue != 0) {
        const imageSide = imagePiece.split('/')[1]

        if (imageSide == side) {
            switch (pieceValue) {
                case Space.Check:
                    val -= 10
                    break;
                case Space.CheckMate:
                    val -= 20
                    break;
            }
        }
        else {
            switch (pieceValue) {
                case Space.Check:
                    val += 10
                    break;
                case Space.CheckMate:
                    val += 20
                    break;
            }
        }
    }

    return val
}

const getPositionValues = (imagePiece, side, pieceAwayFromStart, pawnAwayFromStart) => {
    let val = 0

    if (imagePiece != '') {
        const [, imageSide, pieceImage] = imagePiece.split('/')
        const piece = pieceImage.split('.')[0]

        if (imageSide == side) {
            if (piece == 'pawn' && pawnAwayFromStart == 2) {
                val += 5
            }
            else if (piece == 'pawn') {
                val += pawnAwayFromStart
            }
            else if (piece != 'king') {
                val += pieceAwayFromStart
            }
        }
        else {
            if (piece == 'pawn' && pawnAwayFromStart == 2) {
                val -= 5
            }
            else if (piece == 'pawn') {
                val -= pawnAwayFromStart
            }
            else if (piece != 'king') {
                val -= pieceAwayFromStart
            }
        }
    }

    return val
}

const getBoardsForEachMove = (piecePosition, moveBoard, imageBoard ) => {
    const boards = []

    for (let x = 0; x < moveBoard.length; x++) {
        for (let y = 0; y < moveBoard[x].length; y++) {
            if (moveBoard[x][y] == Space.CanMove || moveBoard[x][y] == Space.Kill || moveBoard[x][y] == Space.KillKing || moveBoard[x][y] == Space.PawnSpecialMove) {
                const newMoveBoard = copyBoard(moveBoard)
                const newImageBoard = copyBoard(imageBoard)

                newMoveBoard[x][y] = moveBoard[piecePosition[0]][piecePosition[1]]
                newMoveBoard[piecePosition[0]][piecePosition[1]] = Space.Empty

                newImageBoard[x][y] = imageBoard[piecePosition[0]][piecePosition[1]]
                newImageBoard[piecePosition[0]][piecePosition[1]] = ''

                boards.push([newImageBoard, newMoveBoard])
            }
        }
    }

    return boards
}

const bestValueFrom = (minMaxArrayValues) => {
    const values = minMaxArrayValues.map((val) => {
        return val[2]
    })

    let maxValueIndex = 0
    let maxValue = values[0]

    for (let index = 0; index < values.length; index++) {
        if (values[index] > maxValue) {
            maxValueIndex = index
            maxValue = values[index]
        }
    }

    return minMaxArrayValues[maxValueIndex]
}

const worstValueFrom = (minMaxArrayValues) => {
    const values = minMaxArrayValues.map((val) => {
        return val[2]
    })

    let minValueIndex = 0
    let minValue = values[0]

    for (let index = 0; index < values.length; index++) {
        if (values[index] < minValue) {
            minValueIndex = index
            minValue = values[index]
        }
    }

    return minMaxArrayValues[minValueIndex]
}