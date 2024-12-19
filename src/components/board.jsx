import { useEffect, useState } from "react";

import Row from "./row";

export default function Board({ initLength, initHeight }) {
    const [length, setLength] = useState(initLength)
    const [height, setHeight] = useState(initHeight)

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    useEffect(() => {
        setHeight(initHeight)
    }, [initHeight])

    const generateBoard = (height, lenght) => {
        const board = []
        let filled = true

        for (let h = 0; h < height; h++) {
            board.push(<Row key={h} initLength={lenght} initFilled={filled} rowIndex={h} />)
            filled = !filled
        }

        return board
    }
    
    return (generateBoard(height, length))
}