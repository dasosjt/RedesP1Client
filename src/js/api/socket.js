import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8080')

const subscribeToState = (cb) => {
  socket.on('state', state => cb(null, state))
  socket.emit('subscribeToState', 1000)
}

export { subscribeToState }
