import React from 'react'
import { subscribeToState, emitPositionChange, emitColision } from './api/socket'
import PlayerCard from './playerCard'

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
    var bounds = document.getElementById("playground").getBoundingClientRect();
    this.setState({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
    emitPositionChange({ position: { x: this.state.x, y: this.state.y } })
  }

  render() {
    return (
      <div className="app">
        <div className="app-title">
          <span className="app-title__name">squar.io</span>
        </div>

        <div className="app-game">
          <div 
            id="playground" 
            className="app-game__playground" 
            style={{height:350, width:900, animationDuration: "0.3s", border:"solid #000000"}}
            onMouseMove={ this._onMouseMove.bind(this) }>
            {this.state.clients.length ? this.state.clients.map( (client, index) => { 
              return (
                <div key={index} style={{position: "relative", top:client.position.y, left:client.position.x, backgroundColor:client.color, height:(client.score < 10) ? 10 : client.score, width:(client.score < 10) ? 10 : client.score}}>
                </div>
              )
            }) : null}
          </div>

          <div className="app-game__players-list">
            <h3 className="app-game__players-list__title">Jugadores</h3>
              {
                this.state.clients.length
                ? this.state.clients.map( (client, index) => { 
                  return (
                      <PlayerCard
                        key={ index }
                        id={ client.id }
                        x={ client.position.x }
                        y={ client.position.y }
                        color={ client.color }
                        score={ client.score } />
                  )}) : null
              }
          </div>
        </div>
      </div>
    )
  }
}

export default App