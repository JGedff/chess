import { copyBoard, getAllKingCheck } from "../functions"

export default function TransformModal({ row, col, side, hideModal, board, updateBoard, imageBoard, updateImageBoard, changeTurn }) {
    const handleClick = (e) => {
        let val = e.target.src.split('/')

        const newImageBoard = copyBoard(imageBoard)
        newImageBoard[row][col] = `/${val[3]}/${val[4]}`

        const newBoard = getAllKingCheck(board, newImageBoard)

        updateImageBoard(newImageBoard)
        updateBoard(newBoard)
        changeTurn()
        hideModal()
    }

    return (
        <div className="bg-light fixed-top container text-center justify-items-center">
            <h3>Transform to</h3>
            <div className="row h-75p w-250p m-2">
                <div className="col h-100" ><img className="h-100" src={`/${side}/tower.png`} alt="" onClick={handleClick} /></div>
                <div className="col h-100" ><img className="h-100" src={`/${side}/bishop.png`} alt="" onClick={handleClick} /></div>
            </div>
            <div className="row h-75p w-250p m-2">
                <div className="col h-100" ><img className="h-100" src={`/${side}/horse.png`} alt="" onClick={handleClick} /></div>
                <div className="col h-100" ><img className="h-100" src={`/${side}/queen.png`} alt="" onClick={handleClick} /></div>
            </div>
        </div>
    )
}