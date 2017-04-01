import fetch from 'node-fetch'

const STOP_ID = 'HSL:1203406'

const getCurrentTimestamp = () => Math.round(Date.now() / 1000)

const doQuery = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
    },
    body: query
  })
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      resolve(res.json())
    })
    .catch(err => {
      console.warn(err) // eslint-disable-line
      setTimeout(() => {
        resolve(doQuery(query))
      }, 10000)
    })
})

export default (stopId = STOP_ID, startTime = getCurrentTimestamp()) =>
  doQuery(`
  {
  stop(id:"${stopId}"){
    name
    gtfsId
    stoptimesWithoutPatterns(
      startTime:"${startTime}",
      timeRange: 18000,
      numberOfDepartures:10
    ) {
      scheduledArrival
      scheduledDeparture
      realtimeArrival
      serviceDay
      stopHeadsign
      trip {
        route {
          gtfsId
          longName
          shortName
        }
      }
    }
  }
}`
).then(res => res.data.stop.stoptimesWithoutPatterns)
