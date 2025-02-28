import { useEffect, useState } from "react"
import { haveSameValues, ImageBoard, MoveBoard } from "../functions"

export default function MoveTimeline({ updateBoard, updateImages, updateTurn, initValBoard, initImageBoard, initTurn, setTimelineMove }) {
    const [imageBoard, setImageBoard] = useState(ImageBoard)
    const [timeLineUpdate, setTimeLineUpdate] = useState(false)

    const [moves, setMoves] = useState([[MoveBoard, ImageBoard, true]])
    const [deletedMoves, setDeletedMoves] = useState([[MoveBoard, ImageBoard, true]])

    useEffect(() => {
        if (!haveSameValues(initImageBoard, imageBoard) && !timeLineUpdate) {
            const newMoves = moves

            newMoves.push([initValBoard, initImageBoard, initTurn])

            setMoves(newMoves)
            setDeletedMoves([[MoveBoard, ImageBoard, true]])
            setImageBoard(initImageBoard)
        }
        else {
            setTimeLineUpdate(false)
        }
    }, [initImageBoard])

    const prevMove = () => {
        const newMoves = moves
        const newDeletedMoves = deletedMoves
        const lastMove = newMoves[newMoves.length - 1]

        setTimeLineUpdate(true)

        newDeletedMoves.push(lastMove)

        newMoves.pop()
        setMoves(newMoves)

        setDeletedMoves(newDeletedMoves)

        updateBoard(lastMove[0])
        updateImages(lastMove[1])
        updateTurn(lastMove[2])

        setTimelineMove(true)
    }
    
    const nextMove = () => {
        const newMoves = moves
        const newDeletedMoves = deletedMoves
        const lastDeletedMove = newDeletedMoves[newDeletedMoves.length - 1]

        setTimeLineUpdate(true)

        newMoves.push(lastDeletedMove)

        setMoves(newMoves)

        updateBoard(lastDeletedMove[0])
        updateImages(lastDeletedMove[1])
        updateTurn(lastDeletedMove[2])

        newDeletedMoves.pop()
        setDeletedMoves(newDeletedMoves)

        setTimelineMove(true)
    }

    const restart = () => {
        setTimeLineUpdate(false)
        setImageBoard(ImageBoard)
        setMoves([[MoveBoard, ImageBoard, true]])
        setDeletedMoves([[MoveBoard, ImageBoard, true]])

        updateTurn(true)
        updateBoard(MoveBoard)
        updateImages(ImageBoard)
    }

    return (
        <div className="pb-2">
            <button className="btn-secondary me-4" onClick={prevMove} disabled={moves.length < 2}>Back ↩</button>
            <button className="btn-secondary me-4" onClick={nextMove} disabled={deletedMoves.length < 2}>Forward ↪</button>
            <button className="btn-secondary" onClick={restart} disabled={moves.length < 2}>Reset game 🔄️</button>
        </div>
    )
}