import { useEffect, useState } from "react"

import Row from "./row"
import MoveTimeline from "./moveTimeline"

import { checkMate, copyBoard, getKingPos, ImageBoard, MoveBoard } from "../functions"
import { Sides, Space } from "../constants"
import { isKingInDanger } from "../functions/king"

export default function Board({ initLength, initHeight }) {
    const [spaceImageBoard, setSpaceImageBoard] = useState(ImageBoard)
    const [spaceBoard, setSpaceBoard] = useState(MoveBoard)
    const [showModal, setShowModal] = useState(false)
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)
    const [turn, setTurn] = useState(true)

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    useEffect(() => {
        if (isKingInDanger(spaceBoard, Sides.Black, spaceImageBoard) && checkMate(spaceBoard, spaceImageBoard, Sides.Black)) {
            const newBoard = copyBoard(spaceBoard)
            const pos = getKingPos(spaceBoard, spaceImageBoard, Sides.Black)
            
            newBoard[pos[0]][pos[1]] = Space.CheckMate
            
            updateBoard(newBoard)
        }

        if (isKingInDanger(spaceBoard, Sides.White, spaceImageBoard) && checkMate(spaceBoard, spaceImageBoard, Sides.White)) {
            const newBoard = copyBoard(spaceBoard)
            const pos = getKingPos(spaceBoard, spaceImageBoard, Sides.White)
            
            newBoard[pos[0]][pos[1]] = Space.CheckMate
            
            updateBoard(newBoard)
        }
    }, [spaceImageBoard])

    /* useEffect(() => {
        console.log(spaceBoard)
    }, [spaceBoard]) */

    const handleTurn = () => {
        setTurn(!turn)
    }

    const updateBoard = (newBoard) => {
        setSpaceBoard(newBoard)
    }

    const updateImageBoard = (newImageBoard) => {
        setSpaceImageBoard(newImageBoard)
    }

    const showTransformModal = (val) => {
        setShowModal(val)
    }

    const generateBoard = (height, lenght) => {
        const board = []
        let filled = true

        for (let h = 0; h < height; h++) {
            board.push(<Row key={h} initLength={lenght} initFilled={filled} rowIndex={h} initialTurn={turn} changeTurn={handleTurn} initBoard={spaceBoard} handleMove={updateBoard} initImageBoard={spaceImageBoard} updateImgBoard={updateImageBoard} initShowModal={showModal} setTransformPawn={showTransformModal} />)
            filled = !filled
        }

        return board
    }
    
    return (
        <div className={ showModal ? "pt-70p mt-70p" : "" }>
            <MoveTimeline updateBoard={setSpaceBoard} updateImages={setSpaceImageBoard} updateTurn={setTurn} initImageBoard={spaceImageBoard} initValBoard={spaceBoard} initTurn={turn} />
            <div className="border border-dark rounded-8p container text-center w-600p h-600p">
                {
                    generateBoard(height, length)
                }
            </div>
        </div>
    )
}