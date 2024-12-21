import { useEffect, useState } from "react"

import { getImage, getSide, handleMovePiece } from "../functions"
import { Sides } from "../constants"

export default function Square({ filled, col, row, initialTurn, changeTurn, initBoard, handleMove }) {
    const [board, setBoard] = useState(initBoard)
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    useEffect(() => {
        setBoard(initBoard)
    }, [initBoard])

    const handleClick = () => {
        handleMovePiece(row, col, board, handleMove, changeTurn)
    }

    const canClick = () => {
        const pieceColor = getSide(row, col)

        if (board[row][col] == 2 || board[row][col] == 3 || board[row][col] == 4 || board[row][col] == 6) {
            return true
        }

        if (turn && (pieceColor == Sides[1])) {
            return true
        }

        if (!turn && (pieceColor == Sides[0])) {
            return true
        }

        return false
    }

    const getBackgroundColor = (fill) => {
        if (board[row][col] == 2) {
            return " bg-info"
        }

        if (board[row][col] == 3) {
            return " bg-warning"
        }

        if (board[row][col] == 4) {
            return " bg-success"
        }

        if (board[row][col] == 6) {
            return " bg-danger"
        }
        
        if (fill) {
            return " bg-black"
        }

        return " bg-white"
    }

    return (
        <button className={"col w-12 align-content-center" + getBackgroundColor(filled)} onClick={handleClick} disabled={!canClick()}>
            {
                getImage(row, col) != '' ?
                <img src={getImage(row, col)} alt="" className="w-100"/> :
                <></>
            }
        </button>
    )
}