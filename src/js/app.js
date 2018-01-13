import React from 'react'
import { subscribeToState, emitPositionChange } from './api/socket'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      clients: [],
      x: 0,
      y: 0
    }
  }

  componentDidMount(){
    subscribeToState((err, state) => { this.setState({ clients: state.clients }) })
  }

  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY })
    emitPositionChange({ position: { x: this.state.x, y: this.state.y } })
  }

  render() {
    return (
      <div className="App" onMouseMove={ this._onMouseMove.bind(this) } >
        <h1>Mouse coordinates: { this.state.x } { this.state.y }</h1>
        <ul>
          {
            this.state.clients.length
            ? this.state.clients.map( (client, index) => { 
              return (
                <li key={ index } >
                  <div>
                  { client.id }
                    <ul>
                    <li> X: { client.position.x } </li>
                    <li> Y: { client.position.y } </li>
                    </ul>
                  </div> 
                </li>
              )}) : null
          }
        </ul>
      </div>
    )
  }
}

export default App