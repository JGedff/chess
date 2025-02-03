import { AI } from "./index";
import { selectRandomPiece } from "./doRandomMove";
import { getNextMove } from "./minMax";

export const move = (spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn) => {
    if (AI.difficulty == 'Random') {
        selectRandomPiece(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, [])
    }
    else if (AI.difficulty == 'Easy') {
        const [newImageBoard, newMoveBoard, ] = getNextMove(spaceImageBoard, spaceBoard, false, 3)

        updateImageBoard(newImageBoard)
        updateBoard(newMoveBoard)
        handleTurn()
    }
    else if (AI.difficulty == 'Hard') {
        const [newImageBoard, newMoveBoard, ] = getNextMove(spaceImageBoard, spaceBoard, false, 5)

        updateImageBoard(newImageBoard)
        updateBoard(newMoveBoard)
        handleTurn()
    }
    else {
        console.error(`${AI.difficulty} difficulty does is not suported by the AI`)
    }
}