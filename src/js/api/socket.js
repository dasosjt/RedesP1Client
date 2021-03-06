import connection from 'socket.io-client'
const socket = connection('http://localhost:8080')

const subscribeToState = cb => {
  socket.on('state', state => cb(null, state))
  socket.emit('subscribeToState', 20)
}

const emitPositionChange = position => socket.emit('emitPositionChange', position)

export { subscribeToState, emitPositionChange }
