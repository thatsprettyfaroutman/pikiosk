import React, { Component } from 'react'
import Container from 'App/components/Container'

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
    return `rgb(${r},${g},${b})`
  }

  render() {
    return (
      <Container style={{backgroundColor: this.state.color}} />
    )
  }
}
