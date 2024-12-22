import { useEffect, useState } from "react"

import Square from "./square"

export default function Row({ initLength, initFilled, rowIndex, initialTurn, changeTurn, initBoard, handleMove, initShowModal, setTransformPeo }) {
    const [showModal, setShowModal] = useState(initShowModal)
    const [filled, setFilled] = useState(initFilled)
    const [length, setLength] = useState(initLength)
    const [board, setBoard] = useState(initBoard)
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setFilled(initFilled)
    }, [initFilled])

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    useEffect(() => {
        setBoard(initBoard)
    }, [initBoard])

    useEffect(() => {
        setShowModal(initShowModal)
    }, [initShowModal])

    const generateRows = (lenght) => {
        const row = []
        let isFilled = filled

        for (let l = 0; l < lenght; l++) {
            row.push(<Square key={l + rowIndex} col={l} row={rowIndex} filled={isFilled} initialTurn={turn} changeTurn={changeTurn} initBoard={board} handleMove={handleMove} initTransformPeo={showModal} showTransform={setTransformPeo} />)
            isFilled = !isFilled
        }

        return row
    }

    return (
        <div className="row h-12">
            {
                generateRows(length)
            }
        </div>
    )
}