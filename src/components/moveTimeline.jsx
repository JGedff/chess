import { useEffect, useState } from "react"
import { ImageBoard, MoveBoard } from "../functions"

export default function MoveTimeline({ updateBoard, updateImages, initMoves, updateMoves, updateTurn, updateFromTimeLine }) {
    const [moves, setMoves] = useState([[MoveBoard, ImageBoard, true]])
    const [deletedMoves, setDeletedMoves] = useState([[MoveBoard, ImageBoard, true]])

    useEffect(() => {
        setMoves(initMoves)
    }, [initMoves])

    const prevMove = () => {
        const newMoves = moves
        const newDeletedMoves = deletedMoves

        newDeletedMoves.push(newMoves[newMoves.length - 1])

        newMoves.pop()

        updateFromTimeLine(true)
        updateMoves(newMoves)
        setDeletedMoves(newDeletedMoves)

        updateBoard(newMoves[newMoves.length - 1][0])
        updateImages(newMoves[newMoves.length - 1][1])
        updateTurn(newMoves[newMoves.length - 1][2])
    }
    
    const nextMove = () => {
        const newMoves = moves
        const newDeletedMoves = deletedMoves

        newMoves.push(newDeletedMoves[newDeletedMoves.length - 1])

        updateMoves(newMoves)

        updateBoard(newDeletedMoves[newDeletedMoves.length - 1][0])
        updateImages(newDeletedMoves[newDeletedMoves.length - 1][1])
        updateTurn(newDeletedMoves[newDeletedMoves.length - 1][2])

        newDeletedMoves.pop()
        setDeletedMoves(newDeletedMoves)
    }

    return (
        <div className="pb-2">
            <button className="btn-secondary" onClick={prevMove} disabled={moves.length <= 2}>Atrás ↩</button>
            <button className="btn-secondary" onClick={nextMove} disabled={deletedMoves.length < 2}>Adelante ↪</button>
        </div>
    )
}