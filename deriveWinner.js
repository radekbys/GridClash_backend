// Helper to get board index from row and column
const getIndex = (row, column) => (row - 1) * 3 + (column - 1)

// Derive winner directly from log
function getDerivedWinnerFromLog (log) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6] // diagonals
  ]

  // Group moves by player
  const movesByPlayer = {}
  for (const turn of log) {
    const index = getIndex(turn.row, turn.column)
    if (!movesByPlayer[turn.player]) {
      movesByPlayer[turn.player] = []
    }
    movesByPlayer[turn.player].push(index)
  }

  // Check if any player's moves contain a winning combo
  for (const player in movesByPlayer) {
    const moves = movesByPlayer[player]
    for (const combo of winningCombinations) {
      if (combo.every(index => moves.includes(index))) {
        const winner = player
        return winner
      }
    }
  }

  // Check for tie (all 9 moves played, no winner)
  if (log.length === 9) {
    return 'tie'
  }

  return null
}

module.exports = getDerivedWinnerFromLog
