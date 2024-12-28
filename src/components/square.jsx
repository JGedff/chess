import { useEffect, useState } from "react"

import { handleMovePiece } from "../functions"
import { Sides, Space } from "../constants"

import TransformModal from "./transformModal"

export default function Square({ filled, col, row, initialTurn, changeTurn, initBoard, handleMove, initImageBoard, updateImageBoard, initTransformPawn, showTransform }) {
    const [showingModal, setShowingModal] = useState(initTransformPawn)
    const [imageBoard, setImageBoard] = useState(initImageBoard)
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
        setImageBoard(initImageBoard)
    }, [initImageBoard])

    useEffect(() => {
        setShowingModal(initTransformPawn)
    }, [initTransformPawn])

    const showTransformModal = () => {
        showTransform(true)
    }

    const hideTransformModal = () => {
        setIsTransforming(false)

        showTransform(false)
    }

    const handleClick = () => {
        handleMovePiece(row, col, board, handleMove, changeTurn, showTransformModal, imageBoard, updateImageBoard)

        if (board[row][col] == Space.PawnSpecialMove) {
            setIsTransforming(true)
        }
    }

    const canClick = () => {
        const pieceColor = imageBoard[row][col].split('/')[1]

        if (showingModal) {
            return false
        }

        if (board[row][col] == Space.CanMove || board[row][col] == Space.Kill || board[row][col] == Space.PawnSpecialMove || board[row][col] == Space.KillKing) {
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
        if (board[row][col] == Space.Check || board[row][col] == Space.KillKing) {
            return " bg-danger"
        }

        if (board[row][col] == Space.PawnSpecialMove) {
            return " bg-success"
        }

        if (board[row][col] == Space.Kill) {
            return " bg-warning"
        }

        if (board[row][col] == Space.CanMove) {
            return " bg-info"
        }
        
        if (fill) {
            return " bg-black"
        }

        return " bg-white"
    }

    return (
        <>
            {
                isTransforming ? <TransformModal row={row} col={col} side={imageBoard[row][col].split('/')[1]} hideModal={hideTransformModal} board={board} updateBoard={handleMove} imageBoard={imageBoard} updateImageBoard={updateImageBoard} /> : <></>
            }
            <button className={"col w-12 align-content-center" + getBackgroundColor(filled)} onClick={handleClick} disabled={!canClick()}>
                {
                    imageBoard[row][col] != '' ?
                    <img src={imageBoard[row][col]} alt="" className="w-100"/> :
                    <></>
                }
            </button>
        </>
    )
}