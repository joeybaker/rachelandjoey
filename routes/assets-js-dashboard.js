import path from 'path'
import versions from '../versions.json'

export default {
  path: `/static/${versions.jsDashboard}/dashboard.js`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'dashboard.js')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'js', 'dashboard']
    , description: 'dashboard js bundle'
  }
}
