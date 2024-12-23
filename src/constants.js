// ['PieceToMove.png', Row, Column, Value], ['KilledPiece', Row, Column]

export const MovingPiece = [
    ['', 0, 0, 0], ['', 0, 0, 0]
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
    SpecialMove: 4,
    King: 5,
    Check: 6,
    KillKing: 7
}