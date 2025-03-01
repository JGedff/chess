# Minimax pruning

## Minimax

A minimax is an algorithm that makes the best move knowing that the opponent will also try to do the best move.

This algorithm creates one branch for each possible move.

Each move, separate in diferent branches. Each one of this branches, are each possible move the opponent can do.

This happens until it reaches the maximum depth, or the game ends.

## Alpha - beta pruning

### Info

Alpha - beta pruning is used to optimize a minimax algorithm.

This optimization also needs something to sort the moves from the best to the worst, if it's the player turn, or from worst to the best if it's the opponent turn.

You can see alpha as the player, and beta as the opponent.

### Player's turn

When is the player's turn, the player tries to get the best result. This result, it saves in Alpha.

If the player can do a move, minimax will calculate how good is it.
If it's result is lower than the Alpha, the player will keep the Alpha and will eliminate the actual branch and next, because he knows that from there, it can only get lower values and that will not help him win.

### Opponent's turn

When is the opponent's turn, the opponent tries to get the worst result for the player. The value, it saves in Beta.

If the opponent can do a move, minimax will calculate how good is it.
If it's result is bigger than the Beta, the opponent will keep the Beta and will eliminate the actual branch and next, because he knows that from there, it can only get bigger values, which will not help him win.

# Adding pruning in the minimax

I've made some changes in the minimax logic and optimized loops


## Minimax before pruning ###

In this case, I move both sides, but the AI thinks for black pieces.

| Time   | User  | Move    |
|:------:|:-----:|:-------:|
|        | WHITE | E7 - E5 |
| 13.66  | BLACK | E2 - E4 |
|        | WHITE | D7 - D5 |
| 44.954 | BLACK | D2 - D4 |
|        | WHITE | C7 - C5 |
| 74.572 | BLACK | C2 - C4 |
|        | WHITE | F7 - F5 |
| 66.581 | BLACK | F2 - F4 |
|        | WHITE | E8 - E7 |
| 50.703 | BLACK | E1 - E2 |

<hr />

Now, I follow the AI for the black pieces.

| Time   | User | Move    |
|:------:|:----:|:-------:|
|        | ME   | E7 - E5 |
| 14.531 | AI   | B1 - A3 |
|        | ME   | D7 - D5 |
| 23.526 | AI   | A1 - B1 |
|        | ME   | C7 - C6 |
| 21.771 | AI   | G1 - H3 |
|        | ME   | F7 - F6 |
| 17.72  | AI   | B2 - B4 |
|        | ME   | B7 - B6 |
| 22.192 | AI   | B1 - B3 |

<hr />

This time, I follow the AI for both sides.

| Time   | User  | Move    |
|:------:|:-----:|:-------:|
| 6.928  | WHITE | A7 - A5 |
| 7.652  | BLACK | H2 - H3 |
| 7.89   | WHITE | A5 - A4 |
| 8.06   | BLACK | H3 - H4 |
| 7.625  | WHITE | B7 - B5 |
| 8.223  | BLACK | H4 - H5 |
| 8.435  | WHITE | A8 - A5 |
| 11.823 | BLACK | H5 - H6 |
| 13.826 | WHITE | B5 - B4 |
| 9.636  | BLACK | H6 - G7 |

<hr />

Finally, I follow AI moves for black pieces once again.

| Time   | User | Move    |
|:------:|:----:|:-------:|
|        | ME   | A7 - A5 |
| 8.051  | AI   | B1 - C3 |
|        | ME   | A5 - A4 |
| 9.858  | AI   | A1 - A2 |
|        | ME   | B7 - B5 |
| 9.639  | AI   | G1 - H3 |
|        | ME   | C7 - C6 |
| 11.203 | AI   | A1 - A2 |
|        | ME   | D7 - D5 |
| 14.637 | AI   | B2 - B4 |
|        | ME   | E7 - E5 |
| 24.683 | AI   | B1 - B3 |
|        | ME   | E5 - E4 |
| 24.442 | AI   | C1 - B2 |
|        | ME   | G7 - G5 |
| 28.692 | AI   | D2 - D4 |
|        | ME   | H7 - H6 |
| 25.96  | AI   | D1 - D3 |
|        | ME   | F7 - F5 |
| 33.083 | AI   | E1 - D2 |

## Minimax after order and pruning moves

In this case, I move both sides, but the AI thinks for black pieces.

| Time   | User  | Move    |
|:------:|:-----:|:-------:|
|        | WHITE | E7 - E5 |
| 2.772  | BLACK | E2 - E4 |
|        | WHITE | D7 - D5 |
| 12.455 | BLACK | D2 - D4 |
|        | WHITE | C7 - C5 |
| 17.48  | BLACK | C2 - C4 |
|        | WHITE | F7 - F5 |
| 13.599 | BLACK | F2 - F4 |
|        | WHITE | E8 - E7 |
| 13.453 | BLACK |         |

<hr />

Now, I follow the AI for the black pieces.

| Time   | User | Move    |
|:------:|:----:|:-------:|
|        | ME   | E7 - E5 |
| 2.745  | AI   | B1 - A3 |
|        | ME   | D7 - D5 |
| 3.161  | AI   | A1 - B1 |
|        | ME   | C7 - C6 |
| 3.019  | AI   | B1 - A1 |
|        | ME   | F7 - F6 |
| 3.159  | AI   | A1 - B1 |
|        | ME   | B7 - B6 |
| 3.315  | AI   | B1 - A1 |

<hr />

This time, I follow the AI for both sides.

| Time   | User  | Move    |
|:------:|:-----:|:-------:|
| 3.464  | WHITE | A7 - A5 |
| 2.439  | BLACK | B1 - A3 |
| 3.744  | WHITE | A5 - A4 |
| 3.607  | BLACK | A1 - B1 |
| 3.747  | WHITE | B7 - B5 |
| 3.285  | BLACK | B1 - A1 |
| 3.957  | WHITE | B5 - B4 |
| 3.321  | BLACK | A1 - B1 |
| 5.003  | WHITE | B4 - B3 |
| 3.334  | BLACK | B1 - A1 |

<hr />

Finally, I follow AI moves for black pieces once again.

| Time   | User | Move    |
|:------:|:----:|:-------:|
|        | ME   | A7 - A5 |
| 2.048  | AI   | B1 - A3 |
|        | ME   | A5 - A4 |
| 2.946  | AI   | A1 - B1 |
|        | ME   | B7 - B5 |
| 2.734  | AI   | B1 - A1 |
|        | ME   | C7 - C6 |
| 2.736  | AI   | A1 - B1 |
|        | ME   | D7 - D5 |
| 2.387  | AI   | B1 - A1 |
|        | ME   | E7 - E5 |
| 2.9    | AI   | A1 - B1 |
|        | ME   | E5 - E4 |
| 2.524  | AI   | B1 - A1 |
|        | ME   | G7 - G5 |
| 2.527  | AI   | A1 - B1 |
|        | ME   | H7 - H6 |
| 2.354  | AI   | B1 - A1 |
|        | ME   | F7 - F5 |
| 2.347  | AI   | A1 - B1 |


# Conclusion

In some moves might seems like it does nothing, but in a lot of them, it speeds up by quite a lot.

Especially in the first case.

Still, I feel like something wierd is happening in the first case.

Almost all times are between 2 - 4 seconds, but the first case, almost all moves are +10 seconds to return a move