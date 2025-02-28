import { useEffect, useState } from "react"

import { handleMovePiece } from "../functions"
import { Sides, Space } from "../constants"

import TransformModal from "./transformModal"

export default function Square({ filled, col, row, initialTurn, changeTurn, initBoard, handleMove, initImageBoard, updateImageBoard, initTransformPawn, showTransform, setTimelineMove }) {
    const [showingModal, setShowingModal] = useState(initTransformPawn)
    const [imageBoard, setImageBoard] = useState(initImageBoard)
    const [isTransforming, setIsTransforming] = useState(false)
    const [imagePiece, setImagePiece] = useState([])
    const [valuePiece, setValuePiece] = useState([])
    const [board, setBoard] = useState(initBoard)
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    useEffect(() => {
        setBoard(initBoard)
        setValuePiece(initBoard[row][col])
    }, [initBoard])

    useEffect(() => {
        setImageBoard(initImageBoard)
        setImagePiece(initImageBoard[row][col])
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

        setTimelineMove(false)

        if (valuePiece == Space.PawnSpecialMove) {
            setIsTransforming(true)
        }
    }

    const canClick = () => {
        const pieceColor = imagePiece[0]

        if (showingModal) {
            return false
        }

        if (valuePiece == Space.CanMove || valuePiece == Space.Kill || valuePiece == Space.PawnSpecialMove || valuePiece == Space.KillKing) {
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
        if (valuePiece == Space.CheckMate) {
            return " bg-secondary"
        }

        if (valuePiece == Space.Check || valuePiece == Space.KillKing) {
            return " bg-danger"
        }

        if (valuePiece == Space.PawnSpecialMove) {
            return " bg-success"
        }

        if (valuePiece == Space.Kill) {
            return " bg-warning"
        }

        if (valuePiece == Space.CanMove) {
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
                isTransforming ? <TransformModal row={row} col={col} side={imagePiece[0]} hideModal={hideTransformModal} board={board} updateBoard={handleMove} imageBoard={imageBoard} updateImageBoard={updateImageBoard} changeTurn={changeTurn}/> : <></>
            }
            <button className={"col w-12 align-content-center" + getBackgroundColor(filled)} onClick={handleClick} disabled={!canClick()} data-id={`${row}-${col}`}>
                {
                    imagePiece != [] ?
                    <img src={"/" + imagePiece.join("/") + ".png"} alt="" className="w-100"/> :
                    <></>
                }
            </button>
        </>
    )
}
