import path from 'path'

export default {
  path: `/static/index.js.map`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'index.js.map')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'js']
    , description: 'js sourcemap'
  }
}
