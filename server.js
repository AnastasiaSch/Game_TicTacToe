'use strict'

const IP = '127.0.0.1'
const PORT = 8081

const express = require('express')
const app = express()
app.use(express.static('public'))

const http = require('http')
const socketIo = require('socket.io')
const webServer = http.Server(app)
const io = socketIo(webServer)

let { infoMessage, statusMessage } = require('./GameModule')

let playerCount = 0
let currentPlayer = 'player_X'
let game = {
    cell0: '',
    cell1: '',
    cell2: '',
    cell3: '',
    cell4: '',
    cell5: '',
    cell6: '',
    cell7: '',
    cell8: '',
}

io.on('connection', socket => {
    playerCount++
    if (playerCount === 1) {
        socket.id = 'player_X'
        socket.emit('getStatus', statusMessage.startMessageForFirstPlayer)
        socket.emit('infoMessage', `${infoMessage.startOfGame}. ${statusMessage.playerX}`)
    }
    if (playerCount === 2) {
        socket.id = 'player_O'
        socket.emit('infoMessage', `${infoMessage.startOfGame}. ${statusMessage.playerO}`)
        io.sockets.emit('getStatus', statusMessage.startMessageForBothPlayers)
    }
    if (playerCount >= 3) {
        socket.id = 'player_Zuschauer'
        socket.emit('infoMessage', infoMessage.player3)
    }

    socket.on('cellClicked', cellId => {
        if (socket.id !== currentPlayer) {
            if(socket.id === "player_X"){
               socket.emit('getStatus', `${statusMessage.notYourTurn}. ${statusMessage.playerX}`)
               return
            } 
            if(socket.id === "player_O"){
               socket.emit('getStatus', `${statusMessage.notYourTurn}. ${statusMessage.playerO}`)
               return
            }            
        }
        if (game[cellId]) {
            socket.emit('getStatus', statusMessage.invalidMove2)
            return
        }

        game[cellId] = currentPlayer === 'player_X' ? 'X' : 'O'
        io.sockets.emit('updateCell', cellId, game[cellId])

        if (currentPlayer) {
            if (socket.id === 'player_X') {
                io.sockets.emit('infoMessage', infoMessage.playerO)
                socket.emit('getStatus', statusMessage.playerX)
            }
            if (socket.id === 'player_O') {
                io.sockets.emit('infoMessage', infoMessage.playerX)
                socket.emit('getStatus', statusMessage.playerO)
            }
        }
 
        currentPlayer = currentPlayer === 'player_X' ? 'player_O' : 'player_X'   
    })

    socket.on('move', (cellId, value) => { 
        if ((game.cell0 === 'X' && game.cell1 === 'X' && game.cell2 === 'X') ||
            (game.cell0 === 'X' && game.cell3 === 'X' && game.cell6 === 'X') ||
            (game.cell0 === 'X' && game.cell4 === 'X' && game.cell8 === 'X') ||
            (game.cell3 === 'X' && game.cell4 === 'X' && game.cell5 === 'X') ||
            (game.cell1 === 'X' && game.cell4 === 'X' && game.cell7 === 'X') ||
            (game.cell2 === 'X' && game.cell4 === 'X' && game.cell6 === 'X') ||
            (game.cell6 === 'X' && game.cell7 === 'X' && game.cell8 === 'X') ||
            (game.cell2 === 'X' && game.cell5 === 'X' && game.cell8 === 'X')) {
            io.sockets.emit('infoMessage', infoMessage.endOfGame.winX)
            io.sockets.emit('getStatus', statusMessage.endOFGame)
            return
        }
        if ((game.cell0 === 'O' && game.cell1 === 'O' && game.cell2 === 'O') ||
            (game.cell0 === 'O' && game.cell3 === 'O' && game.cell6 === 'O') ||
            (game.cell0 === 'O' && game.cell4 === 'O' && game.cell8 === 'O') ||
            (game.cell3 === 'O' && game.cell4 === 'O' && game.cell5 === 'O') ||
            (game.cell1 === 'O' && game.cell4 === 'O' && game.cell7 === 'O') ||
            (game.cell2 === 'O' && game.cell4 === 'O' && game.cell6 === 'O') ||
            (game.cell6 === 'O' && game.cell7 === 'O' && game.cell8 === 'O') ||
            (game.cell2 === 'O' && game.cell5 === 'O' && game.cell8 === 'O')) {
            io.sockets.emit('infoMessage', infoMessage.endOfGame.winO)
            io.sockets.emit('getStatus', statusMessage.endOFGame)
            return
        } 
        if ((game.cell0 === 'O' || game.cell0 === 'X') && 
            (game.cell1 === 'O' || game.cell1 === 'X') && 
            (game.cell2 === 'O' || game.cell2 === 'X') && 
            (game.cell3 === 'O' || game.cell3 === 'X') && 
            (game.cell4 === 'O' || game.cell4 === 'X') && 
            (game.cell5 === 'O' || game.cell5 === 'X') && 
            (game.cell6 === 'O' || game.cell6 === 'X') && 
            (game.cell7 === 'O' || game.cell7 === 'X') && 
            (game.cell8 === 'O' || game.cell8 === 'X')) {
            io.sockets.emit('infoMessage', infoMessage.endOfGame.winXO)
            io.sockets.emit('getStatus', statusMessage.endOFGame)
            return
        }    
    })
})

webServer.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}/`)
})
