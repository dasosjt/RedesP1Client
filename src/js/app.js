import React from 'react'
import { subscribeToTimer } from './api/socket'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      timestamp: 'No timestamp yet'
    }

    subscribeToTimer((err, timestamp) => this.setState({ timestamp }))
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    )
  }
}

export default App