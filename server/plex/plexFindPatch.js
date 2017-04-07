import PlexApi from 'plex-api'
import credentials from 'plex-api-credentials'
import env from 'node-env-file'

env(`${__dirname}/../.env`)

if (!process.env.PLEX_USERNAME) throw new Error('PLEX_USERNAME env missing')
if (!process.env.PLEX_PASSWORD) throw new Error('PLEX_PASSWORD env missing')
if (!process.env.PLEX_HOSTNAME) throw new Error('PLEX_HOSTNAME env missing')

const userAndPass = credentials({username: process.env.PLEX_USERNAME, password: process.env.PLEX_PASSWORD})

const client = new PlexApi({hostname: process.env.PLEX_HOSTNAME, authenticator: userAndPass})

function find(options, criterias) {
  if (typeof options === 'string') {
    // Support old method of only supplying a single `url` parameter
    options = {
      uri: options
    }
  }
  if (options.uri === undefined) {
    throw new TypeError('Requires uri parameter')
  }

  return this.query(options).then(function(result) {
    if (result.MediaContainer) {
      if (result.MediaContainer.Metadata) {
        return filterChildrenByCriterias(result.MediaContainer.Metadata, criterias)
      } else if (result.MediaContainer.Directory) {
        return filterChildrenByCriterias(result.MediaContainer.Directory, criterias)
      } else {
        return result.MediaContainer
      }
    }
    return result
  })
}

function filterChildrenByCriterias(children, criterias) {
  var context = {
    criterias: criterias || {}
  }

  return children.filter(criteriasMatchChild, context)
}

function criteriasMatchChild(child) {
  var criterias = this.criterias

  return Object.keys(criterias).reduce(function matchCriteria(hasFoundMatch, currentRule) {
    var regexToMatch = new RegExp(criterias[currentRule])
    return regexToMatch.test(child[currentRule])
  }, true)
}

export const plexFind = find.bind(client)
