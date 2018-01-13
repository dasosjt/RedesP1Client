import React from 'react'
import { subscribeToState } from './api/socket'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      clients: [],
      my_position: {
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount(){
    subscribeToState((err, state) => { this.setState({ clients: state.clients }) })
  }

  render() {
    return (
      <div className="App">
        { this.state.id }
        <ul>
          {
            this.state.clients 
            ? this.state.clients.map( (client, index) => <li key={ index } > { client.id } </li>) : null
          }
        </ul>
      </div>
    )
  }
}

export default App