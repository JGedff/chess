import { useEffect, useState } from "react"

export default function Winner({ won, setContinue }) {
    const [wonSide, setWonSide] = useState(won)

    useEffect(() => {
        setWonSide(won)
    }, [won])

    const handleClick = () => {
        setContinue(true)
    }

    return (
        <div className="w-100 h-100 fixed-top align-content-center bg-half-grey">
            <div className="bg-light container fit-content p-3 rounded">
                <p className="m-0 fs-1">
                    Winner: {wonSide.toUpperCase()} team!
                </p>
                <button className="btn btn-success fs-4" onClick={handleClick}>Continue</button>
            </div>
        </div>
    )
}