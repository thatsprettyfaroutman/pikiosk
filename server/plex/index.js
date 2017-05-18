import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { decode } from 'node-base64-image'
import { plexFind } from './plexFindPatch'

const PATH_START = process.env.NODE_ENV === 'developemnt' ? 'http://localhost:3001' : ''

const loadImage = (plexItemArt, filename) => new Promise(resolve => {
  const STATIC_DIR = `${global.__root}/static` // eslint-disable-line
  plexFind(plexItemArt).then(buffer => {
    decode(buffer, {
      filename: `${STATIC_DIR}/${filename}`
    }, () => {
      resolve(`${PATH_START}/static/${filename}.jpg`)
    })
  }).catch(error => console.log(error))
})

const stripItem = item => new Promise(resolve => {
  const itemData = {
    key: `${item.grandparentRatingKey}-${item.parentRatingKey}-${item.ratingKey}`,
    showName: item.grandparentTitle,
    season: item.parentIndex,
    episode: item.index,
    addedAt: item.addedAt * 1000,
    summary: item.summary,
    thumb: null,
    art: null,
  }

  if (!item.grandparentThumb) {
    return resolve(itemData)
  }

  loadImage(item.grandparentThumb, `${item.grandparentRatingKey}-thumb`).then(thumb => {
    loadImage(item.grandparentArt, `${item.grandparentRatingKey}-art`).then(art => {
      itemData.thumb = thumb
      itemData.art = art
      resolve(itemData)
    })
  })
})

export default () => plexFind('/library/sections/2/recentlyAdded').then(res => {
  const picked = []

  res.sort((a, b) => {
    const aa = a.viewCount || 0
    const bb = b.viewCount || 0
    return aa - bb
  })

  const items = res.filter(item => {
    const daysDiff = differenceInCalendarDays(Date.now(), item.addedAt * 1000)
    const id = item.grandparentRatingKey
    const title = item.grandparentTitle
    const viewCount = item.viewCount || 0

    if (picked.indexOf(id) !== -1) return false
    if (viewCount !== 0) return false
    if (title.toLowerCase().indexOf('morty') !== -1 || daysDiff <= 7) {
      picked.push(id)
      return true
    }

    return false
  })

  return Promise.all(items.map(stripItem))
}, err => {
  console.error('Could not connect to server', err) // eslint-disable-line
})
