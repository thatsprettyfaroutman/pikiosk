import React from 'react'
import classNames from 'classnames'
import poll from 'App/services/poll'
import Container from 'App/components/Container'
import Loading from 'App/components/Loading'

import './Weather.css'

export default () => {
  let temp = poll.data.weather
  if (typeof temp === 'undefined') return <Loading />
  return (
    <Container className="Weather">
      <span className={classNames({
        'Weather--hot': temp > 10,
        'Weather--cold': temp < 0,
      })}>
        { temp }
      </span>°
    </Container>
  )
}
