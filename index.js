process.title = 'rachelandjoey'

const hapi = require('hapi')
  , path = require('path')
  , fs = require('fs')
  , atomifyCSS = require('atomify-css')
  , React = require('react')
  , jace = require('jace')
  , browserify = require('browserify')
  , entryJs = require('./components/home/index.jsx')
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
server.connection({port: 8000, host: 'localhost'})

let builtJs
function buildJs (callback) {
  if (builtJs) return void callback.apply(null, builtJs)

  server.log(['info', 'http', 'bundle', 'js'], 'started')
  const b = browserify({debug: true})

  b.add(path.join(__dirname, 'components', '_entry', 'index.jsx'))

  b.transform('babelify')
  b.plugin('minifyify', {map: '/static/index.js.map'})

  b.bundle(function bundled () {
    let args = [].slice.call(arguments, 0)
    builtJs = args
    server.log(['info', 'http', 'bundle', 'js'], 'finished')
    callback.apply(null, args)
  })
}

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
    handler: function jsHandler (req, reply) {
      buildJs(function bundled (err, js) {
        if (err) return void reply(err)
        else reply(js).type('application/javascript')
      })
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
    handler: function jsHandler (req, reply) {
      buildJs(function bundled (err, js, map) {
        reply(err || map)
      })
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

server.route({
  path: '/'
  , method: 'GET'
  , config: {
    handler: function homeHandler (req, reply) {
      fs.readFile(path.join(__dirname, 'static', 'index.html'), function onReadHTML (err, html) {
        if (err) return void reply(err)
        const initialHTML = React.renderToString(React.createElement(entryJs))
        reply(html.toString()
          .replace('{{entry}}', '/static/index.js')
          .replace('id="app">', 'id="app">' + initialHTML)
          )
          .type('text/html')
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
