import 'whatwg-fetch'

export const nowTodayInSeconds = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return Math.round((Date.now() - start.getTime()) / 1000)
}

export const timeBetweenTramAndNow = (tramTime) => {
  const SECONDS_IN_DAY = 86400
  const now = nowTodayInSeconds()
  let diff = tramTime - now
  if (diff < SECONDS_IN_DAY / -2) {
    diff = tramTime + SECONDS_IN_DAY - now
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
