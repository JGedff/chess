import { useEffect, useState } from "react"

import Row from "./row"
import MoveTimeline from "./moveTimeline"

import { ImageBoard, MoveBoard } from "../functions"

export default function Board({ initLength, initHeight }) {
    const [updateFromTimeLine, setUpdateFromTimeLine] = useState(false)
    const [spaceImageBoard, setSpaceImageBoard] = useState(ImageBoard)
    const [spaceBoard, setSpaceBoard] = useState(MoveBoard)
    const [showModal, setShowModal] = useState(false)
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)
    const [turn, setTurn] = useState(true)
    const [moves, setMoves] = useState([]) // [ [SPACE_BOARD, IMAGES_BOARD, TURN], [SPACE_BOARD, IMAGES_BOARD, TURN], [SPACE_BOARD, IMAGES_BOARD, TURN] ]

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    useEffect(() => {
        if (!updateFromTimeLine) {
            moves.push([spaceBoard, spaceImageBoard, turn])
        }
        else {
            setUpdateFromTimeLine(true)
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
            board.push(<Row key={h} initLength={lenght} initFilled={filled} rowIndex={h} initialTurn={turn} changeTurn={handleTurn} initBoard={spaceBoard} handleMove={updateBoard} initImageBoard={spaceImageBoard} updateImgBoard={updateImageBoard} initShowModal={showModal} setTransformPeo={showTransformModal} />)
            filled = !filled
        }

        return board
    }
    
    return (
        <div className={ showModal ? "pt-4 mt-4" : "" }>
            <MoveTimeline updateBoard={setSpaceBoard} updateImages={setSpaceImageBoard} initMoves={moves} updateMoves={setMoves} updateTurn={setTurn} updateFromTimeLine={setUpdateFromTimeLine} />
            <div className="border border-dark rounded-8p container text-center w-500p h-500p">
                {
                    generateBoard(height, length)
                }
            </div>
        </div>
    )
}