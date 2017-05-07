import React from 'react'
import classNames from 'classnames'
import poll from 'App/services/poll'
import Container from 'App/components/Container'
import Loading from 'App/components/Loading'
import AwesomeText from 'App/components/AwesomeText'

import './Weather.css'

export default () => {
  let temp = poll.data.weather
  if (typeof temp === 'undefined') return <Loading />
  return (
    <Container className="Weather">
      <AwesomeText className={classNames({
        'Weather--hot': temp > 10,
        'Weather--cold': temp < 0,
      })}>
        { temp }°
      </AwesomeText>
    </Container>
  )
}
