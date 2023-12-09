'use strict'

const infoMessage = {
    startOfGame: 'Der Startspieler ist X',
    playerX: 'Am Zug: X',
    playerO: 'Am Zug: O',
    player3: 'Sie befinden sich im Zuschauer-Modus',
    endOfGame: {
        winX: 'Spiel beendet: Spieler X hat gewonnen',
        winO: 'Spiel beendet: Spieler O hat gewonnen',
        winXO: 'Spiel endet unentschieden!',
    },
}

const statusMessage = {
    startMessageForFirstPlayer: 'Bitte warten Sie auf Ihren Gegner!',
    startMessageForBothPlayers: 'Zwei Spieler verbunden. Das Spiel kann beginnen!',
    playerX: 'Sie spielen als X',
    playerO: 'Sie spielen als O',
    endOFGame: 'Das Spiel ist zu Ende',
    invalidMoveX: 'Ungueltiger Zug: X ist nicht am Zug',
    invalidMoveO: 'Ungueltiger Zug: O ist nicht am Zug',
    invalidMove1: 'Ungueltiger Zug: das Spiel ist zu Ende',
    invalidMove2: 'Ungueltiger Zug: das Zielfeld ist nicht frei',
    notYourTurn: 'Ungueltiger Zug: Sie sind nicht am Zug',
}

module.exports = { infoMessage, statusMessage }
