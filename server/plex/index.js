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
  })
})

const stripItem = item => new Promise(resolve => {
  loadImage(item.grandparentThumb, `${item.grandparentRatingKey}-thumb`).then(thumb => {
    loadImage(item.grandparentArt, `${item.grandparentRatingKey}-art`).then(art => {
      resolve({
        key: `${item.grandparentRatingKey}-${item.parentRatingKey}-${item.ratingKey}`,
        showName: item.grandparentTitle,
        season: item.parentIndex,
        episode: item.index,
        addedAt: item.addedAt * 1000,
        summary: item.summary,
        thumb,
        art,
      })
    })
  })
})

export default () => plexFind('/library/sections/2/recentlyAdded').then(res => {
  const items = res.filter(item => {
    const daysDiff = differenceInCalendarDays(Date.now(), item.addedAt * 1000)
    if (daysDiff <= 7) return true //&& item.viewCount === 0
    return false
  })
  return Promise.all(items.map(stripItem))
}, err => {
  console.error('Could not connect to server', err) // eslint-disable-line
})
