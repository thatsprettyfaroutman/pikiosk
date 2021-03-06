import React from 'react'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import poll from 'App/services/poll'
import Container from 'App/components/Container'
import Loading from 'App/components/Loading'

import './Plex.css'

export default () => {
  let data = poll.data.plex
  if (!data || !data.length) return <Loading />

  const specialItem = data.find(item => item.showName.toLowerCase().indexOf('morty') !== -1)

  data = data.filter((_, i) => i < 3)
  return (
    <Container className="Plex">
      {
        specialItem ? <SpecialPlexItem item={specialItem} /> :
        data.map(item => <PlexItem key={item.key} item={item} />)
      }
    </Container>
  )
}

const SpecialPlexItem = ({item}) => (
  <div className="Plex__specialItem">
    NEW { item.showName.toUpperCase() } OMFG
  </div>
)

const PlexItem = ({item}) => {
  const days = differenceInCalendarDays(Date.now(), item.addedAt)

  return (
    <div className="Plex__item" style={{ backgroundImage: `url(${item.thumb})` }}>
      <p>{!days ? 'Today' : days > 1 ? `${days} days ago` : `${days} day ago`}</p>
    </div>
  )
}
