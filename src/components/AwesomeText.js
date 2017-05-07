import React, { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
    this.state = { color: this.randomColor() }
    this.mounted = false
    this.goNuts = this.goNuts.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.goNuts()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  goNuts() {
    if (this.mounted) this.setState({ color: this.randomColor() }, () => {
      requestAnimationFrame(this.goNuts)
    })
  }

  randomColor() {
    const r = parseInt(Math.random() * 255, 10)
    const g = parseInt(Math.random() * 255, 10)
    const b = parseInt(Math.random() * 255, 10)
    return `rgba(${r},${g},${b}, 0.8)`
  }

  render() {
    return (
      <span
        className={this.props.className}
        style={{textShadow: `0 20px 0 ${this.state.color}`}}
        children={this.props.children}
      />
    )
  }
}
