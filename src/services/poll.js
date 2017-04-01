import { getJson } from 'App/utils'

class Poll {
  constructor() {
    this.data = {}
    this.__poll = this.__poll.bind(this)
    this.__poll()
  }

  __poll() {
    getJson('/poll')
      .then(res => {
        this.data = { ...res }
        setTimeout(() => {
          this.__poll()
        }, 10000)
      })
  }
}

export default new Poll()
