import fetch from 'node-fetch'

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=7d05f32d3baaae6039efc0453838c0b1&units=metric'

export const getJson = query => new Promise((resolve, reject) => {
  return fetch(query)
    .then(res => {
      switch (res.status) {
        case 200:
          const data = res.json()
          return data

        default:
          console.log('[ERROR] Weather => Couldnt get weather')
          reject('nope')
      }
    })
    .then(data => {
      console.log('[INFO] Weather =>', data)
      resolve(data)
    })
})

export default () => getJson(API_URL)
