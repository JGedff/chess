import { useEffect, useState } from "react";

import { getImage, handleMovePiece } from "../functions";

export default function Square({ filled, col, row, initialTurn, changeTurn, initBoard, handleMove }) {
    const [board, setBoard] = useState(initBoard)
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    useEffect(() => {
        setBoard(initBoard)
    }, [initBoard])

    useEffect(() => {
        //console.log(board)
    }, [board])

    const handleClick = () => {
        handleMovePiece(row, col, board, handleMove, changeTurn)
    }

    const canClick = () => {
        let image = getImage(row, col)
        let pieceColor = image.split('/')[1]

        if (board[row][col] == 2 || board[row][col] == 3 || board[row][col] == 4) {
            return true
        }

        if (turn && (pieceColor == 'white')) {
            return true
        }

        if (!turn && (pieceColor == 'black')) {
            return true
        }

        return false
    }

    const getBackgroundColor = (fill) => {
        if (board[row][col] == 2) {
            return " bg-info"
        }

        if (board[row][col] == 3) {
            return " bg-danger"
        }

        if (board[row][col] == 4) {
            return " bg-warning"
        }
        
        if (fill) {
            return " bg-black"
        }
        else {
            return " bg-white"
        }
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