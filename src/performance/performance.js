import { Space } from "../constants"
import { handleMovePiece } from "../functions"

const updateBoard = (board) => {
    console.log('update board => ', board)
}

const changeTurn = (boolean) => {
    console.log('change turn => ', boolean)
}

const showTransformModal = (boolean) => {
    console.log('show transform modal => ', boolean)
}

const ImageBoard = [
    ["/black/tower.png","/black/horse.png","/black/bishop.png","/black/queen.png","/black/king.png","/black/bishop.png","/black/horse.png","/black/tower.png"],
    ["/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png"],
    ["/white/tower.png","/white/horse.png","/white/bishop.png","/white/queen.png","/white/king.png","/white/bishop.png","/white/horse.png","/white/tower.png"],
]

const MoveBoard = [
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.King, Space.Fill, Space.Fill, Space.Fill],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
    [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.King, Space.Fill, Space.Fill, Space.Fill],
]

export class ChessPerformance {
    constructor() {
        this.moveBoard = MoveBoard
        this.imageBoard = ImageBoard
    }

    all = () => {
        this.testPerformance_handleMovePiece_emptySpace()
        this.testPerformance_handleMovePiece_queenMiddleBoard()
    }

    testPerformance_handleMovePiece_emptySpace = () => {
        let start = new Date()
    
        handleMovePiece(3, 3, this.moveBoard, updateBoard, changeTurn, showTransformModal, this.imageBoard, updateBoard)
        
        let finish = new Date()
        
        console.log(`Click on empty space: ${(finish - start) / 1000} seconds`)
    }
    
    testPerformance_handleMovePiece_queenMiddleBoard = () => {
        this.moveBoard[3][3] = Space.Fill
        this.moveBoard[7][3] = Space.Empty

        this.imageBoard[3][3] = this.imageBoard[7][3]
        this.imageBoard[7][3] = ''

        let start = new Date()
    
        handleMovePiece(3, 3, this.moveBoard, updateBoard, changeTurn, showTransformModal, this.imageBoard, updateBoard)
        
        let finish = new Date()

        this.moveBoard[3][3] = Space.Empty
        this.moveBoard[7][3] = Space.Fill

        this.imageBoard[7][3] = this.imageBoard[3][3]
        this.imageBoard[3][3] = ''
        
        console.log(`Click on queen in the middle of the board: ${(finish - start) / 1000} seconds`)
    }
}