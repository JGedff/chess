import { getImage } from "../functions/board";

export default function Square({ filled, col, row }) {
    return (
        <div className={"col w-12 align-content-center bg-" + (filled ? "black" : "white")}>
            {
                getImage(row, col) != '' ?
                <img src={getImage(row, col)} alt="" className="w-100"/> :
                <></>
            }
        </div>
    )
}