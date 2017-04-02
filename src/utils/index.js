import 'whatwg-fetch'

export const nowTodayInSeconds = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return Math.round((Date.now() - start.getTime()) / 1000)
}

export const timeBetweenTramAndNow = (tramTime, now=nowTodayInSeconds()) => {
  // !!! Such haxy solutions, don't use in anything real
  const SECONDS_IN_DAY = 86400
  let diff = tramTime - now

  // Midnight passing hax thingies
  if (diff > SECONDS_IN_DAY) {
    return (tramTime - SECONDS_IN_DAY) - now
  } else if (diff > SECONDS_IN_DAY / 2 && tramTime > now) {
    return tramTime - ( now + SECONDS_IN_DAY )
  }
  return diff
}

export const getJson = query => new Promise(resolve => {
  return fetch(query)
    .then(res => {
      switch (res.status) {
        case 200:
          resolve(res.json())
          break

        default:
          setTimeout(() => {
            resolve(getJson(query))
          }, 1000)
      }
    })
})

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        error => {
          reject(error)
        }
      )
    } else {
      reject('Navigator does not support geolocation')
    }
  })
}

export const getLocationForAddress = address => {
  const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  return new Promise((resolve) => {
    fetch(`${API_URL}${address}`)
      .then(res => res.json())
      .then(res => res.results)
      .then(res => res.map(item => ({
        address: item.formatted_address,
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
        placeId: item.place_id,
      })))
      .then(res => {
        resolve(res)
      })
  })
}
