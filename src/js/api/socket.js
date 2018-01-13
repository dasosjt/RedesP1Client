import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8080')

const subscribeToState = cb => {
  socket.on('state', state => cb(null, state))
  socket.emit('subscribeToState', 10)
}

const emitPositionChange = position => socket.emit('emitPositionChange', position)

export { subscribeToState, emitPositionChange }
