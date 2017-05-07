import './NightShade.css'

import React, { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
    this.state = { active: true }
  }

  render() {
    return <div className={`NightShade ${this.state.active ? 'NightShade--active' : ''}`} />
  }
}
