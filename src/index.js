import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Trams from 'App/views/Trams'
import Weather from 'App/views/Weather'
import Plex from 'App/views/Plex'

import 'normalize.css'
import 'Ionicons/ionicons.css'
import './index.css'

const NUM_VIEWS = 3
const REFRESH_INTERVAL_MS = 1000
const VIEW_CHANGE_INTERVAL_MS = 5000

setTimeout(() => {
  window.location.reload(false)
}, 60000 * 30)

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: 0,
      refresh: 0,
    }
    this.refreshInterval = null
    this.viewInterval = null
  }

  componentDidMount() {
    this.refreshInterval = setInterval(() => {
      this.setState({
        refresh: this.state.refresh + 1
      })
    }, REFRESH_INTERVAL_MS)

    this.viewInterval = setInterval(() => {
      let nextView = this.state.view + 1
      if (nextView >= NUM_VIEWS) nextView = 0
      this.setState({
        view: nextView
      })
    }, VIEW_CHANGE_INTERVAL_MS)
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval)
    this.refreshInterval = null
    clearInterval(this.viewInterval)
    this.viewInterval = null
  }

  render() {
    const views = [<Trams />, <Weather />, <Plex />]
    return (
      <div className="App">
        <iframe src="http://tv.giphy.com/swag" />
        { views[this.state.view] }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// Module hot reloading
if ( process.env.NODE_ENV === 'development' ) {
  const check = () => {
    module.hot.check((err, updatedModules) => {
      if (updatedModules) check()
    })
  }

  window.onmessage = event => {
    if ( module.hot.status() !== 'idle' ) return
    if ( event.data.indexOf('webpackHotUpdate') === -1 ) return
    check()
  }

  module.hot.accept()
}
