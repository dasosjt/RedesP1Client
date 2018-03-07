import React from 'react'
import { subscribeToState, emitPositionChange, emitColision } from './api/socket'
import PlayerCard from './playerCard'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      clients: [],
      x: 0,
      y: 0,
      comida: []
    }

  }

  componentDidMount(){
    subscribeToState((err, state) => { this.setState({ clients: state.clients, comida:state.comida }) })
  

  }

  _onMouseMove(e) {
    var bounds = document.getElementById("playground").getBoundingClientRect();
    this.setState({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
    emitPositionChange({ position: { x: this.state.x, y: this.state.y } })
    emitColision(0.01)
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
            onMouseMove={ this._onMouseMove.bind(this) }>
            <div>
             <div className="app-game__players-list__player-cards">
            {this.state.clients.length ? this.state.clients.map( (client,index) => { 
              //console.log(this.state.comida[0][index])
              return (
                <div key={index} style={{position: "absolute", top:client.position.y, left:client.position.x, backgroundColor:client.color, height:(client.score < 10) ? 10 : client.score, width:(client.score < 10) ? 10 : client.score}}>
                </div>
              )
            }) : null}
            </div>
            {this.state.comida.length ? this.state.comida.map( (comida,index) => { 
              //console.log(this.state.comida[0][index].x,this.state.comida[0][index].y)
          
              return (
                  <div key={index} style={{position: "absolute", top:comida.y, left:comida.x, backgroundColor:comida.color, height: 10 , width:10}}>
                  </div>
              )
                            
              
            }) : null}
          </div> 
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