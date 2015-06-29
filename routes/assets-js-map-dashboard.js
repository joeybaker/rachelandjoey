import path from 'path'

export default {
  path: `/static/dashboard.js.map`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'dashboard.js.map')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'js']
    , description: 'js sourcemap'
  }
}
