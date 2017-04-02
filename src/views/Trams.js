import React from 'react'
import poll from 'App/services/poll'
import Container from 'App/components/Container'
import Loading from 'App/components/Loading'
import { timeBetweenTramAndNow } from 'App/utils'

import './Trams.css'

export default ({ routeShortName='9' }) => {
  let data = poll.data.trams
  if (!data) return <Loading />

  data = data.filter( x => x.trip.route.shortName.indexOf(routeShortName) !== -1 )

  if (!data.length) return (
    <Container className="Trams">-</Container>
  )

  let time = parseInt(timeBetweenTramAndNow(data[0].realtimeArrival) / 60, 10)
  const isHours = time >= 60
  if ( isHours ) time = Math.round(time/60)

  return (
    <Container className="Trams">{ time }{ isHours && <span>h</span> }</Container>
  )
}
