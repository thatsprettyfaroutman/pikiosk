import express from 'express'
import {Server as httpServer} from 'http'
import path from 'path'
import trams from './trams'
import weather from './weather'

const PORT = process.env.PORT || 3001
const app = express()
const server = httpServer(app)


// ---------------------------------------------
// ---- ROUTES N SHIT
// ---------------------------------------------

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
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










server.listen(PORT, () => {
  console.log(`PIKIOSK server listening port ${PORT}!`) // eslint-disable-line
})
