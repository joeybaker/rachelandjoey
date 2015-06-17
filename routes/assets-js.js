import path from 'path'
import versions from '../versions.json'

export default {
  path: `/static/${versions.js}/index.js`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'index.js')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'js']
    , description: 'js bundle'
  }
}
