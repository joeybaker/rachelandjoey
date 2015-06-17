import path from 'path'
import versions from '../versions.json'

export default {
  path: `/static/${versions.css}/entry.css`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'entry.css')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'css']
    , description: 'atomify css bundle'
  }
}
