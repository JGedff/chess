export default function Square({ filled, col, row }) {
    return (
        <div className={"col w-12 bg-" + (filled ? "black" : "white")}>
        </div>
    )
}