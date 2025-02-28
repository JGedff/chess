// ['PieceToMove.png', Row, Column, Value]

export const MovingPiece = [
    '', 0, 0, 0
]

export const Sides = {
    Black: 'black',
    White: 'white'
}

export const Space = {
    Empty: 0,
    Fill: 1,
    CanMove: 2,
    Kill: 3,
    PawnSpecialMove: 4,
    King: 5,
    Check: 6,
    KillKing: 7,
    CheckMate: 8
}

export const towerDirections = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
]

export const bishopDirections = [
    [-1, -1], [-1, 1], [1, -1], [1, 1], // up-left, up-right, down-left, down-right
]

export const queenDirections = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],
    [-1, 0], [1, 0], [0, -1], [0, 1]
];