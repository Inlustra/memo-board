import React, { Component } from 'react'
import './App.css'
import MemoBoard from '../MemoBoard/MemoBoard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Memo Board</h1>
        </header>
        <MemoBoard />
      </div>
    )
  }
}

export default App
