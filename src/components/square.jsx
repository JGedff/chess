import { useEffect, useState } from "react";
import { getImage } from "../functions/board";

export default function Square({ filled, col, row, initialTurn, changeTurn }) {
    const [turn, setTurn] = useState(initialTurn)

    useEffect(() => {
        setTurn(initialTurn)
    }, [initialTurn])

    const handleClick = () => {
        changeTurn()
    }

    const canClick = () => {
        if (turn && (getImage(row, col).split('/')[1] == 'white')) {
            return true
        }

        if (!turn && (getImage(row, col).split('/')[1] == 'black')) {
            return true
        }

        return false
    }

    return (
        <button className={"col w-12 align-content-center bg-" + (filled ? "black" : "white")} onClick={handleClick} disabled={!canClick()}>
            {
                getImage(row, col) != '' ?
                <img src={getImage(row, col)} alt="" className="w-100"/> :
                <></>
            }
        </button>
    )
}