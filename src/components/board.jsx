import { useEffect, useState } from "react"

import Row from "./row"
import { MoveBoard } from "../functions"

export default function Board({ initLength, initHeight }) {
    const [spaceBoard, setSpaceBoard] = useState(MoveBoard)
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)
    const [turn, setTurn] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    /* useEffect(() => {
        console.log(spaceBoard)
    }, [spaceBoard]) */

    const handleTurn = () => {
        setTurn(!turn)
    }

    const updateBoard = (newBoard) => {
        setSpaceBoard(newBoard)
    }

    const showTransformModal = (val) => {
        setShowModal(val)
    }

    const generateBoard = (height, lenght) => {
        const board = []
        let filled = true

        for (let h = 0; h < height; h++) {
            board.push(<Row key={h} initLength={lenght} initFilled={filled} rowIndex={h} initialTurn={turn} changeTurn={handleTurn} initBoard={spaceBoard} handleMove={updateBoard} initShowModal={showModal} setTransformPeo={showTransformModal} />)
            filled = !filled
        }

        return board
    }
    
    return (
        <>
            {
                generateBoard(height, length)
            }
        </>
    )
}