const $ = q => document.querySelector(q)
const $$ = q => document.querySelectorAll(q)

let socket = io.connect()

$('#cell0').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell0')
})

$('#cell1').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell1')
})

$('#cell2').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell2')
})

$('#cell3').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell3')
})

$('#cell4').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell4')
})

$('#cell5').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell5')
})

$('#cell6').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell6')
})

$('#cell7').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell7')
})

$('#cell8').addEventListener('click', ev => {
   socket.emit('cellClicked', 'cell8')
})

socket.on('updateCell', (cellId, value) => {
   $(`#${cellId}`).innerHTML = value 
   socket.emit('move', cellId, value)
})

socket.on('infoMessage', arg => {
   $('#infoArea').innerHTML = arg
})

socket.on('getStatus', arg => {
   $('#statusArea').innerHTML = arg
})











