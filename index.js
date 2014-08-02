var hapi = require('hapi')
  , path = require('path')
  , atomify = require('atomify')
  , server = new hapi.Server(8000, {
    security: {
      // enable strict transport security
      hsts: true
      // don't allow embdeding of this site
      , xframe: true
    }
    , files: {
      relativeTo: __dirname
    }
    , json: {
      space: 2
    }
    , payload: {
      // 1MB max
      maxBytes: 1048576
    }
    , timeout: {
      // max upload time, 10s
      client: 10000
      // server timesout at 30s
      , server: 30 * 1000
    }
  })

// force https
server.ext('onRequest', function serverOnRequest(req, next){
  if (req.headers['x-forwarded-for'] && !req.raw.req.connection.xForward){
    console.log('https!!!!!!!!')
    req.raw.req.connection.xForward = req.headers['x-forwarded-for']
  }
  else console.log('not an https connection!')
  next()
})

server.route({
  path: '/index.css'
  , method: 'GET'
  , config: {
    handler: function handleCss(req, res){
      atomify.css({
        entry: path.join(__dirname, 'components/_entry/index.css')
        , plugins: [
          ['rework-inherit']
        ]
      }, function atomifiedCss(err, css){
        if (err) return void res(err)

        res(css).type('text/css')
      })

    }
    , cache: {
      // change to 'default' in prod
      privacy: 'private'
      // set to some huge number in prod
      , expiresIn: 1
    }
    , tags: ['assets', 'css']
    , description: 'atomify css bundle'
  }
})

server.route({
  path: '/{any*}'
  , method: '*'
  , handler: {
    directory: {
      path: path.join(__dirname, 'static')
      , index: true
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
