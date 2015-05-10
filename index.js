'use strict'

require('babel/register')

var hapi = require('hapi')
  , path = require('path')
  , fs = require('fs')
  , atomifyCSS = require('atomify-css')
  , React = require('react')
  , autoprefixer = require('autoprefixer-core')
  , jace = require('jace')
  , browserify = require('browserify')
  , entryJs = require('./components/home/index.jsx')
  , config = jace({
    configPath: path.join(__dirname, 'config')
  })
  , server = new hapi.Server()
  , expiresIn = 1000 * 60 * 60 * 24 * 365

server.connection({port: 8000})

server.app.config = config

var builtJs
function buildJs(callback){
  if (builtJs) return void callback.apply(null, builtJs)

  var b = browserify({debug: true})

  b.add(path.join(__dirname, 'components', '_entry', 'index.jsx'))

  b.transform('babelify')
  b.plugin('minifyify', {map: '/static/index.js.map'})

  b.bundle(function bundled(){
    let args = [].slice.call(arguments, 0)
    builtJs = args
    callback.apply(null, args)
  })
}

function buildCss(callback){
  atomifyCSS({
    entry: path.join(__dirname, 'static', 'index.css')
  }, function(err, css){
    if (err) return void callback(err)
    callback(null, autoprefixer.process(css).css)
  })
}
buildCss(function builtCss(err, css){
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
    handler: function jsHandler(req, reply){
      buildJs(function bundled(err, js){
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
    handler: function jsHandler(req, reply){
      buildJs(function bundled(err, js, map){
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
    handler: function homeHandler(req, reply){
      fs.readFile(path.join(__dirname, 'static', 'index.html'), function onReadHTML(err, html){
        if (err) return void reply(err)
        var initialHTML = React.renderToString(React.createElement(entryJs))
        reply(html.toString()
          .replace('{{entry}}', '/static/index.js')
          .replace('<body>', '<body>' + initialHTML)
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

server.start(function startServer(){
  server.log(['server', 'init'], 'started')
})

server.on('log', function(e){
  console.info(new Date(e.timestamp).toISOString(), e.tags, e.data)
})

server.on('request', function(req, e){
  console.info(new Date(e.timestamp).toISOString(), e.tags, req.method, req.path, e.request)
})

server.on('internalError', function(request, err){
  console.error(new Date().toISOString(), err.message, err.stack, request.id, request.method, request.path)
})
