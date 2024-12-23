import { ImageBoard, getAllKingCheck } from "../functions"

export default function TransformModal({ row, col, side, hideModal, board, updateBoard }) {
    const handleClick = (e) => {
        const newBoard = getAllKingCheck(board)
        let val = e.target.src.split('/')

        ImageBoard[row][col] = `/${val[3]}/${val[4]}`

        updateBoard(newBoard)
        hideModal()
    }

    return (
        <div className="bg-light fixed-top container text-center justify-items-center">
            <h3>Transform to</h3>
            <div className="row h-75p w-250p m-2">
                <div className="col h-100" ><img className="h-100" src={`/${side}/torre.png`} alt="" onClick={handleClick} /></div>
                <div className="col h-100" ><img className="h-100" src={`/${side}/alfil.png`} alt="" onClick={handleClick} /></div>
            </div>
            <div className="row h-75p w-250p m-2">
                <div className="col h-100" ><img className="h-100" src={`/${side}/cavall.png`} alt="" onClick={handleClick} /></div>
                <div className="col h-100" ><img className="h-100" src={`/${side}/reina.png`} alt="" onClick={handleClick} /></div>
            </div>
        </div>
    )
}