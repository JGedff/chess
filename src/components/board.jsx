import { useEffect, useState } from "react"

import Row from "./row"
import MoveTimeline from "./moveTimeline"

import { checkMate, copyBoard, getKingPos, ImageBoard, MoveBoard } from "../functions"
import { Sides, Space } from "../constants"
import Winner from "./winner"
import { AI } from "../AI"

export default function Board({ initLength, initHeight }) {
    const [spaceImageBoard, setSpaceImageBoard] = useState(ImageBoard)
    const [spaceBoard, setSpaceBoard] = useState(MoveBoard)
    const [timelineMove, setTimelineMove] = useState(false)
    const [difficulty, setDifficulty] = useState('Easy') // Default: '' | Values: [Random | Easy | Chessjs]
    const [endGame, setEndGame] = useState([false, ""])
    const [showModal, setShowModal] = useState(false)
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)
    const [turn, setTurn] = useState(true) // Default: true | Values: [true, false]

    const [ready, setReady] = useState(false)
    const [lastMove, setLastMove] = useState(false)

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    useEffect(() => {
        AI.difficulty = difficulty
    }, [difficulty])

    /* useEffect(() => {
        console.log(spaceBoard)
    }, [spaceBoard]) */

    useEffect(() => {
        let gameOver = false
        let side = Sides.White
        let otherSide = Sides.Black

        if (!turn) {
            const aux = side
            side = otherSide
            otherSide = aux
        }

        if (checkMate(spaceBoard, spaceImageBoard, side)) {
            const newBoard = copyBoard(spaceBoard)
            const pos = getKingPos(spaceBoard, spaceImageBoard, side)
            
            newBoard[pos[0]][pos[1]] = Space.CheckMate
            
            updateBoard(newBoard)
            setEndGame([true, otherSide])

            gameOver = true
        }

        if ((!timelineMove && !turn && !gameOver) || (!ready && ready != lastMove)) {
            setLastMove(ready)
            AI.move(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, false)
        }
        else if (ready && ready != lastMove) {
            setLastMove(ready)
            AI.move(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, true)
        }
    }, [spaceImageBoard, ready])

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

    const changeReady = () => {
        setReady(!ready)
    }

    const generateBoard = (height, lenght) => {
        const board = []
        let filled = true

        for (let x = 0; x < height; x++) {
            board.push(<Row key={x} initLength={lenght} initFilled={filled} rowIndex={x} initialTurn={turn} changeTurn={handleTurn} initBoard={spaceBoard} handleMove={updateBoard} initImageBoard={spaceImageBoard} updateImgBoard={updateImageBoard} initShowModal={showModal} setTransformPawn={showTransformModal} setTimelineMove={setTimelineMove}/>)
            filled = !filled
        }

        return board
    }
    
    return (
        <div className={ showModal ? "mt-175p" : "" }>
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
            <button onClick={changeReady}>NEXT MOVE</button>
        </div>
    )
}