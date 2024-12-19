import { useEffect, useState } from "react";

import Square from "./square";

export default function Row({ initLength, initFilled, rowIndex }) {
    const [filled, setFilled] = useState(initFilled)
    const [length, setLength] = useState(initLength)

    useEffect(() => {
        setFilled(initFilled)
    }, [initFilled])

    useEffect(() => {
        setLength(initLength)
    }, [initLength])

    const generateRows = (lenght) => {
        const row = []
        let isFilled = filled

        for (let l = 0; l < lenght; l++) {
            row.push(<Square key={l + rowIndex} col={l} row={rowIndex} filled={isFilled} />)
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