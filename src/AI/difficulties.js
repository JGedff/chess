import { AI } from "./index";
import { selectRandomPiece } from "./doRandomMove";

export const move = (spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn) => {
    if (AI.difficulty == 'Random') {
        selectRandomPiece(spaceImageBoard, spaceBoard, updateImageBoard, updateBoard, handleTurn, [])
    }
    else {
        console.error(`${AI.difficulty} difficulty does is not suported by the AI`)
    }
}