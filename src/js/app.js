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
    var bounds = document.getElementById("playground").getBoundingClientRect();
    this.setState({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
    emitPositionChange({ position: { x: this.state.x, y: this.state.y } })
  }

  render() {
    return (
      <div className="App">
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
                    <li> Color: { client.color } </li>
                    </ul>
                  </div> 
                </li>
              )}) : null
          }
        </ul>

        <div 
          id="playground" 
          className="playground" 
          style={{position: "absolute", height:350, width:900, animationDuration: "0.3s", border:"solid #000000"}}
          onMouseMove={ this._onMouseMove.bind(this) }>
          {this.state.clients.length ? this.state.clients.map( (client, index) => { 
            return (
              <div key={index} style={{position: "relative", top:client.position.y, left:client.position.x, backgroundColor:client.color, height:10, width:10}}>
              </div>
            )
          }) : null}
        </div>
      </div>
    )
  }
}

export default App