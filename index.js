process.title = 'rachelandjoey'

import ReactRoutes from './components/_routes/'
import ReactData from './components/_routes/example/data.js'

const hapi = require('hapi')
  , path = require('path')
  , fs = require('fs')
  , atomifyCSS = require('atomify-css')
  , React = require('react')
  , jace = require('jace')
  , browserify = require('browserify')
  , ReactRouter = require('react-router')
  , config = jace({
    configPath: path.join(__dirname, 'config')
  })
  , bulkRequire = require('bulk-require')
  , server = new hapi.Server()
  , packs = bulkRequire(__dirname, ['packs/*.js']).packs
  , routes = bulkRequire(__dirname, ['routes/*.js']).routes
  , _ = require('lodash')
  , expiresIn = 1000 * 60 * 60 * 24 * 365

server.app.config = config

const connectionOptions = {port: 8000}
if (config.nodeEnv === 'development') connectionOptions.host = 'localhost'
server.connection(connectionOptions)

// only build in dev
// TODO: move this to a build step
if (config.nodeEnv === 'development') {
  function buildJs (callback) {
    server.log(['info', 'http', 'bundle', 'js'], 'started')
    const b = browserify({
      debug: true
      , extensions: ['.js', '.json', '.jsx']
    })

    b.add(path.join(__dirname, 'static', 'entry.js'))

    b.transform('babelify')
    b.plugin('minifyify', {map: '/static/index.js.map'})

    b.bundle(function bundled (...args) {
      server.log(['info', 'http', 'bundle', 'js'], 'finished')
      callback.apply(null, args)
    })
  }
  buildJs(function bundled (err, js, map) {
    if (err) throw err
    fs.writeFileSync(path.join(__dirname, 'static', 'index.js'), js)
    fs.writeFileSync(path.join(__dirname, 'static', 'index.js.map'), map)
  })

  function buildCss (callback) {
    server.log(['info', 'http', 'bundle', 'css'], 'started')
    atomifyCSS({
      entry: path.join(__dirname, 'components', '_routes', 'index.css')
      , autoprefixer: true
    }, callback)
  }
  buildCss(function builtCss (err, css) {
    if (err) throw err
    fs.writeFileSync(path.join(__dirname, 'static', 'entry.css'), css)
  })
}

server.route({
  path: '/static/entry.css'
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, 'static', 'entry.css')
    }
    , cache: {
      // change to 'default' in prod
      privacy: 'public'
      // TODO: set to some huge number in prod
      , expiresIn: expiresIn
    }
    , tags: ['assets', 'css']
    , description: 'atomify css bundle'
  }
})

server.route({
  path: '/static/index.js'
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, 'static', 'index.js')
    }
    , cache: {
      // change to 'default' in prod
      privacy: 'public'
      // TODO: set to some huge number in prod
      , expiresIn: expiresIn
    }
    , tags: ['assets', 'js']
    , description: 'js bundle'
  }
})

server.route({
  path: '/static/index.js.map'
  , method: 'GET'
  , config: {
    handler: {
      file: path.join(__dirname, 'static', 'index.js.map')
    }
    , cache: {
      // change to 'default' in prod
      privacy: 'public'
      // TODO: set to some huge number in prod
      , expiresIn: expiresIn
    }
    , tags: ['assets', 'js']
    , description: 'js sourcemap'
  }
})

const html = fs.readFileSync(path.join(__dirname, 'static', 'index.html')).toString()
server.route({
  path: '/{path*}'
  , method: 'GET'
  , config: {
    handler: function homeHandler (req, reply) {
      ReactRouter.run(ReactRoutes, req.path, (Handler) => {
        const initialHTML = React.renderToString(React.createElement(Handler, ReactData))
        let title = 'Rachel & Joey'

        if (React.documentHead) {
          title = React.documentHead.title
          React.documentHead = {}
        }

        reply(html
          .replace('id="app">', 'id="app">' + initialHTML)
          .replace('<title>Rachel & Joey</title>', `<title>${title}</title>`)
          ).type('text/html')
      })
    }
    , cache: {
      privacy: 'public'
      , expiresIn: expiresIn
    }
  }
})

server.route(_.values(routes))

const startServer = _.after(_.size(packs), function startServer () {
  server.start(function serverStarted () {
    server.log(['server', 'init'], server.info)
  })
})
_.each(packs, function startPack (pack) {
  pack(server, startServer)
})
