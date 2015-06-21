import path from 'path'

export default {
  path: `/browserconfig.xml`
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, '..', 'static', 'browserconfig.xml')
    }
    // no need to set a cache since we're reading from a file, hapi sets
    // the expires-in header for us
    , tags: ['assets', 'ico']
    , description: 'manifest.json for chrome icons'
  }
}
