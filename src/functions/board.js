const Logic_board = [
    ["/black/torre.png","/black/cavall.png","/black/alfil.png","/black/reina.png","/black/rei.png","/black/alfil.png","/black/cavall.png","/black/torre.png"],
    ["/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png","/black/peo.png"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png","/white/peo.png"],
    ["/white/torre.png","/white/cavall.png","/white/alfil.png","/white/reina.png","/white/rei.png","/white/alfil.png","/white/cavall.png","/white/torre.png"],
]

export const getImage = (row, col) => {
    return Logic_board[row][col]
}