import { Sides, Space } from "../constants"
import { checkMate, handleMovePiece } from "../functions"

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

class Crono {
    constructor() {
        this.init = null
        this.end = null
    }

    start = () => {
        this.init = new Date()
    }

    stop = () => {
        this.end = new Date()
    }

    getDiffSeconds = () => {
        return (this.end - this.init) / 1000
    }
}

const cronometer = new Crono()

export class ChessPerformance {
    constructor() {
        this.moveBoard = MoveBoard
        this.imageBoard = ImageBoard
    }

    all = () => {
        this.timePerformance_handleMovePiece_emptySpace()
        this.timePerformance_handleMovePiece_queenMiddleBoard()

        this.timePerformance_checkMate_noMate()
        this.timePerformance_checkMate_yesMate()
    }

    timePerformance_handleMovePiece_emptySpace = () => {
        cronometer.start()
        
        handleMovePiece(3, 3, this.moveBoard, updateBoard, changeTurn, showTransformModal, this.imageBoard, updateBoard)
        
        cronometer.stop()
        
        console.log(`Click on empty space: ${cronometer.getDiffSeconds()} seconds`)
    }
    
    timePerformance_handleMovePiece_queenMiddleBoard = () => {
        let moveBoard = [
            [Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.King, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.King, Space.Fill, Space.Fill, Space.Fill],
        ]

        let imageBoard = [
            ["/black/tower.png","/black/horse.png","/black/bishop.png","/black/queen.png","/black/king.png","/black/bishop.png","/black/horse.png","/black/tower.png"],
            ["/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png"],
            ["","","","","","","",""],
            ["","","","/white/queen.png","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png"],
            ["/white/tower.png","/white/horse.png","/white/bishop.png","","/white/king.png","/white/bishop.png","/white/horse.png","/white/tower.png"],
        ]

        cronometer.start()
        
        handleMovePiece(3, 3, moveBoard, updateBoard, changeTurn, showTransformModal, imageBoard, updateBoard)
        
        cronometer.stop()
        
        console.log(`Click on queen in the middle of the board: ${cronometer.getDiffSeconds()} seconds`)
    }
    
    timePerformance_checkMate_noMate = () => {
        cronometer.start()
        
        const danger = checkMate(this.moveBoard, this.imageBoard, Sides.White)

        cronometer.stop()

        console.log(`Is checkMate? (${danger}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_checkMate_yesMate = () => {
        let moveBoard = [
            [Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.King, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.King, Space.Fill, Space.Empty, Space.Fill],
        ]
        
        let imageBoard = [
            ["/black/tower.png","/black/horse.png","/black/bishop.png","","/black/king.png","/black/bishop.png","/black/horse.png","/black/tower.png"],
            ["/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png"],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","/black/queen.png","","",""],
            ["","","","","","","",""],
            ["/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","","/white/pawn.png","/white/pawn.png","/white/pawn.png"],
            ["/white/tower.png","/white/horse.png","/white/bishop.png","/white/pawn.png","/white/king.png","/white/pawn.png","","/white/tower.png"],
        ]
        
        cronometer.start()

        const danger = checkMate(moveBoard, imageBoard, Sides.White)

        cronometer.stop()

        console.log(`Is checkMate? (${danger}): ${cronometer.getDiffSeconds()} seconds`)
    }
}