import express from 'express'
import path from 'path'
import {Server as httpServer} from 'http'
import trams from './trams'
import weather from './weather'
import plex from './plex'

global.__root = path.resolve(__dirname) // eslint-disable-line

const PORT = process.env.PORT || 3001
const app = express()
const server = httpServer(app)



// ---------------------------------------------
// ---- ROUTES N SHIT
// ---------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')))
app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

app.get('/poll', (req, res) => {
  res.status(200).send(JSON.stringify(pollData))
})


// ---------------------------------------------
// ---- DATA GATHERING
// ---------------------------------------------

const pollData = {
  trams: [],
  weather: {},
  plex: [],
}

const pollTrams = () => {
  trams().then(res => { pollData.trams = res }).catch()
}
setInterval(() => {
  pollTrams()
}, 60000)
pollTrams()

const pollWeather = () => {
  weather().then(res => { pollData.weather = res.main.temp }).catch()
}
setInterval(() => {
  pollWeather()
}, 60000 * 60)
pollWeather()

const pollPlex = () => {
  plex().then(res => { pollData.plex = res }).catch()
}
setInterval(() => {
  pollPlex()
}, 60000 * 60 )
pollPlex()










server.listen(PORT, () => {
  console.log(`PIKIOSK server listening port ${PORT}!`) // eslint-disable-line
})
