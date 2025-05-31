// server.js
const express = require('express')
const app = express()
const cors = require('cors')

const getDerivedWinnerFromLog = require('./deriveWinner.js')

app.use(cors())
app.use(express.json())

// Define a port
const PORT = process.env.PORT || 4000

let gameId = 0
const games = []

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/game/:gameId', (req, res) => {
  const gameId = Number(req.params.gameId)
  const gameIndex = games.findIndex(g => g.id === gameId)
  if (gameIndex === -1) {
    return res.status(404).json({ error: 'Game not found' })
  }
  const game = games[gameIndex]
  res.json({ message: 'game loaded', game })
})

app.post('/start', (req, res) => {
  const id = gameId
  gameId += 1

  players = req.body.players

  const game = {
    id: id,
    winner: null,
    players: players,
    log: []
  }
  games.push(game)
  res.json(game)
})

app.post('/nextTurn', (req, res) => {
  const { gameId, turn } = req.body
  const gameIndex = games.findIndex(g => g.id === gameId)

  if (gameIndex === -1) {
    return res.status(404).json({ error: 'Game not found' })
  }

  const game = games[gameIndex]
  game.log.push(turn)

  const winner = getDerivedWinnerFromLog(game.log)
  if (winner) {
    game.winner = winner
  }

  res.json({ message: 'Turn recorded', game })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
