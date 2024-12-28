import { useEffect, useState } from "react"
import { haveSameValues, ImageBoard, MoveBoard } from "../functions"

export default function MoveTimeline({ updateBoard, updateImages, updateTurn, initValBoard, initImageBoard, initTurn }) {
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

        setTimeLineUpdate(true)

        newDeletedMoves.push(newMoves[newMoves.length - 1])

        newMoves.pop()
        setMoves(newMoves)

        setDeletedMoves(newDeletedMoves)

        updateBoard(newMoves[newMoves.length - 1][0])
        updateImages(newMoves[newMoves.length - 1][1])
        updateTurn(newMoves[newMoves.length - 1][2])
    }
    
    const nextMove = () => {
        const newMoves = moves
        const newDeletedMoves = deletedMoves

        setTimeLineUpdate(true)

        newMoves.push(newDeletedMoves[newDeletedMoves.length - 1])

        setMoves(newMoves)

        updateBoard(newDeletedMoves[newDeletedMoves.length - 1][0])
        updateImages(newDeletedMoves[newDeletedMoves.length - 1][1])
        updateTurn(newDeletedMoves[newDeletedMoves.length - 1][2])

        newDeletedMoves.pop()
        setDeletedMoves(newDeletedMoves)
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