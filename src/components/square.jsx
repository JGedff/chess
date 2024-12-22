import { useEffect, useState } from "react"

import { getImage, getSide, handleMovePiece } from "../functions"
import { Sides, Space } from "../constants"
import TransformModal from "./transformModal"

export default function Square({ filled, col, row, initialTurn, changeTurn, initBoard, handleMove, initTransformPeo, showTransform }) {
    const [showingModal, setShowingModal] = useState(initTransformPeo)
    const [isTransforming, setIsTransforming] = useState(false)
    const [board, setBoard] = useState(initBoard)
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    useEffect(() => {
        setBoard(initBoard)
    }, [initBoard])

    useEffect(() => {
        setShowingModal(initTransformPeo)
    }, [initTransformPeo])

    const showTransformModal = () => {
        showTransform(true)
    }

    const hideTransformModal = () => {
        setIsTransforming(false)

        showTransform(false)
    }

    const handleClick = () => {
        handleMovePiece(row, col, board, handleMove, changeTurn, showTransformModal)

        if ((row == 0 || row == board.length) && getImage(row, col).split('/')[2] == 'peo.png') {
            setIsTransforming(true)
        }
    }

    const canClick = () => {
        const pieceColor = getSide(row, col)

        if (showingModal) {
            return false
        }

        if (board[row][col] == Space.CanMove || board[row][col] == Space.Kill || board[row][col] == Space.SpecialMove || board[row][col] == Space.KillKing) {
            return true
        }

        if (turn && (pieceColor == Sides.White)) {
            return true
        }

        if (!turn && (pieceColor == Sides.Black)) {
            return true
        }

        return false
    }

    const getBackgroundColor = (fill) => {
        if (board[row][col] == Space.CanMove) {
            return " bg-info"
        }

        if (board[row][col] == Space.Kill) {
            return " bg-warning"
        }

        if (board[row][col] == Space.SpecialMove) {
            return " bg-success"
        }

        if (board[row][col] == Space.Check || board[row][col] == Space.KillKing) {
            return " bg-danger"
        }
        
        if (fill) {
            return " bg-black"
        }

        return " bg-white"
    }

    return (
        <>
            {
                isTransforming ? <TransformModal row={row} col={col} side={getSide(row, col)} hideModal={hideTransformModal} /> : <></>
            }
            <button className={"col w-12 align-content-center" + getBackgroundColor(filled)} onClick={handleClick} disabled={!canClick()}>
                {
                    getImage(row, col) != '' ?
                    <img src={getImage(row, col)} alt="" className="w-100"/> :
                    <></>
                }
            </button>
        </>
    )
}