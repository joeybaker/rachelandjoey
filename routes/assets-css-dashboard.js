import path from 'path'
import versions from '../versions.json'

export default {
  path: `/static/${versions.cssDashboard}/dashboard.css`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'dashboard.css')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'css', 'dashboard']
    , description: 'atomify css dashboard bundle'
  }
}
