import { useEffect, useState } from "react"

import Row from "./row"
import MoveTimeline from "./moveTimeline"

import { checkMate, copyBoard, getKingPos, ImageBoard, MoveBoard } from "../functions"
import { Sides, Space } from "../constants"
import { isKingInDanger } from "../functions/king"
import Winner from "./winner"
import { AI } from "../AI"

export default function Board({ initLength, initHeight }) {
    const [spaceImageBoard, setSpaceImageBoard] = useState(ImageBoard)
    const [spaceBoard, setSpaceBoard] = useState(MoveBoard)
    const [timelineMove, setTimelineMove] = useState(false)
    const [difficulty, setDifficulty] = useState('Random') // Default: '' | Values: [Random]
    const [endGame, setEndGame] = useState([false, ""])
    const [showModal, setShowModal] = useState(false)
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)
    const [turn, setTurn] = useState(true) // Default: true | Values: [true, false]

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    useEffect(() => {
        AI.difficulty = difficulty
    }, [difficulty])

    useEffect(() => {
        console.log(spaceBoard)
    }, [spaceBoard])

    useEffect(() => {
        let gameOver = false

        if (isKingInDanger(spaceBoard, Sides.Black, spaceImageBoard) && checkMate(spaceBoard, spaceImageBoard, Sides.Black)) {
            const newBoard = copyBoard(spaceBoard)
            const pos = getKingPos(spaceBoard, spaceImageBoard, Sides.Black)
            
            newBoard[pos[0]][pos[1]] = Space.CheckMate
            
            updateBoard(newBoard)
            setEndGame([true, Sides.White])

            gameOver = true
        }

        if (isKingInDanger(spaceBoard, Sides.White, spaceImageBoard) && checkMate(spaceBoard, spaceImageBoard, Sides.White)) {
            const newBoard = copyBoard(spaceBoard)
            const pos = getKingPos(spaceBoard, spaceImageBoard, Sides.White)
            
            newBoard[pos[0]][pos[1]] = Space.CheckMate
            
            updateBoard(newBoard)
            setEndGame([true, Sides.Black])

            gameOver = true
        }

        if (!timelineMove && !turn && !gameOver) {
            AI.move(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn)
        }
    }, [spaceImageBoard])

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

    const setContinue = (bool) => {
        setEndGame(!bool)
    }

    const generateBoard = (height, lenght) => {
        const board = []
        let filled = true

        for (let h = 0; h < height; h++) {
            board.push(<Row key={h} initLength={lenght} initFilled={filled} rowIndex={h} initialTurn={turn} changeTurn={handleTurn} initBoard={spaceBoard} handleMove={updateBoard} initImageBoard={spaceImageBoard} updateImgBoard={updateImageBoard} initShowModal={showModal} setTransformPawn={showTransformModal} setTimelineMove={setTimelineMove}/>)
            filled = !filled
        }

        return board
    }
    
    return (
        <div className={ showModal ? "pt-70p mt-70p" : "" }>
            {
                endGame[0] ?
                <Winner won={endGame[1]} setContinue={setContinue}/> :
                <></>
            }
            <MoveTimeline updateBoard={setSpaceBoard} updateImages={setSpaceImageBoard} updateTurn={setTurn} initImageBoard={spaceImageBoard} initValBoard={spaceBoard} initTurn={turn} setTimelineMove={setTimelineMove} />
            <div className="border border-dark rounded-8p container text-center w-600p h-600p">
                {
                    generateBoard(height, length)
                }
            </div>
        </div>
    )
}