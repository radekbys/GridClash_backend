// server.js
const express = require('express')
const app = express()

// Define a port
const PORT = process.env.PORT || 4000

let gameId = 0
const games = []

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/start', (req, res) => {
  const id = gameId
  gameId += 1
  const game = {
    id: id,
    winner: undefined,
    log: []
  }
  games.push(game)
  res.json(game)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
