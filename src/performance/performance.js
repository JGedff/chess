import { selectRandomPiece } from "../AI/doRandomMove"
import { getNextMove } from "../AI/minMax"
import { Sides, Space } from "../constants"
import { checkMate, handleMovePiece } from "../functions"
import { playerCanMove } from "../functions/board"
import { getKingPos, isKingInDanger } from "../functions/king"

const updateBoard = (board) => {
    console.log('update board => ', board)
}

const changeTurn = () => {
    console.log('change turn => ', false)
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
        this.performanceMainFunctions()

        this.performanceAi()
    }

    performanceMainFunctions = () => {
        this.timePerformance_handleMovePiece_emptySpace()
        this.timePerformance_handleMovePiece_queenMiddleBoard()

        this.timePerformance_checkMate_no()
        this.timePerformance_checkMate_yes()

        this.timePerformance_isKingInDanger_no()
        this.timePerformance_isKingInDanger_yes()

        this.timePerformance_getKingPos()

        this.timePerformance_playerCanMove_no()
        this.timePerformance_playerCanMove_yes()
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
    
    timePerformance_checkMate_no = () => {
        cronometer.start()
        
        const danger = checkMate(this.moveBoard, this.imageBoard, Sides.White)

        cronometer.stop()

        console.log(`Is checkMate? (${danger}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_checkMate_yes = () => {
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

    timePerformance_isKingInDanger_no = () => {
        cronometer.start()
        
        const danger = isKingInDanger(this.moveBoard, Sides.White, this.imageBoard)

        cronometer.stop()

        console.log(`Is king in danger? (${danger}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_isKingInDanger_yes = () => {
        let moveBoard = [
            [Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.King, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Fill],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Fill, Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.Fill, Space.Fill, Space.Fill],
            [Space.Fill, Space.Fill, Space.Fill, Space.Empty, Space.Check, Space.Empty, Space.Empty, Space.Fill],
        ]
        
        let imageBoard = [
            ["/black/tower.png","/black/horse.png","/black/bishop.png","","/black/king.png","/black/bishop.png","/black/horse.png","/black/tower.png"],
            ["/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png","/black/pawn.png"],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","/black/queen.png","","",""],
            ["","","","","","","",""],
            ["/white/pawn.png","/white/pawn.png","/white/pawn.png","/white/pawn.png","","/white/pawn.png","/white/pawn.png","/white/pawn.png"],
            ["/white/tower.png","/white/horse.png","/white/bishop.png","","/white/king.png","","","/white/tower.png"],
        ]
        
        cronometer.start()
        
        const danger = isKingInDanger(moveBoard, Sides.White, imageBoard)

        cronometer.stop()

        console.log(`Is king in danger? (${danger}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_getKingPos = () => {
        cronometer.start()
        
        let pos = getKingPos(this.moveBoard, this.imageBoard, Sides.White)

        cronometer.stop()

        console.log(`Get King Position (${pos}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_playerCanMove_yes = () => {
        cronometer.start()
        
        let canMove = playerCanMove(this.imageBoard, this.moveBoard, true)

        cronometer.stop()

        console.log(`Player can move? (${canMove}): ${cronometer.getDiffSeconds()} seconds`)
    }

    timePerformance_playerCanMove_no = () => {
        let moveBoard = [
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.King],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Fill, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
            [Space.King, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty, Space.Empty],
        ]
        
        let imageBoard = [
            ["","","","","","","","/black/king.png"],
            ["","","","","","/white/queen.png","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["/white/king.png","","","","","","",""],
        ]

        cronometer.start()
        
        let canMove = playerCanMove(imageBoard, moveBoard, false)

        cronometer.stop()

        console.log(`Player can move? (${canMove}): ${cronometer.getDiffSeconds()} seconds`)
    }

    performanceAi = () => {
        this.timePerformance_selectRandomPiece()

        this.timePerformance_getNextMove_easyDifficulty()
        this.timePerformance_getNextMove_normalDifficulty()
    }

    timePerformance_selectRandomPiece = () => {
        cronometer.start()
        
        selectRandomPiece(this.imageBoard, this.moveBoard, updateBoard, updateBoard, changeTurn, [])

        cronometer.stop()

        console.log(`AI random move: ${cronometer.getDiffSeconds()} seconds`)
    }
    
    timePerformance_getNextMove_easyDifficulty = () => {
        cronometer.start()

        const [newImageBoard, newMoveBoard, ] = getNextMove(this.imageBoard, this.moveBoard, true, 3)

        cronometer.stop()
    
        console.log(`AI minmax move (depth 3): ${cronometer.getDiffSeconds()} seconds`)
        console.log(newImageBoard, newMoveBoard)
    }
    
    timePerformance_getNextMove_normalDifficulty = () => {
        console.log('WAIT TOO LONG +20seconds')
/*         cronometer.start()

        const [newImageBoard, newMoveBoard, ] = getNextMove(this.imageBoard, this.moveBoard, true, 5)

        cronometer.stop()
    
        console.log(`AI minmax move (depth 5): ${cronometer.getDiffSeconds()} seconds`)
        console.log(newImageBoard, newMoveBoard) */
    }
}