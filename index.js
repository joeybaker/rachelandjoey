var hapi = require('hapi')
  , server = new hapi.Server(8000, 'localhost', {
    // debug: {error: true}
  })

// force https
server.ext('onRequest', function serverOnRequest(req, next){
  console.log(req.info)
  if (req.headers['x-forwarded-for'] && !req.raw.req.connection.xForward){
    console.log('https!!!!!!!!')
    req.raw.req.connection.xForward = req.headers['x-forwarded-for']
  }
  else console.log('not an https connection!')
  console.log(req.raw.req.connection.xForward)
  next()
})

server.route({
  path: '/{any*}'
  , method: '*'
  , handler: {
    directory: {
      path: './static'
      , index: true
    }
  }
})

server.start(function startServer(){
  server.log(['server', 'init'], 'started')
})

server.on('log', function(e){
  console.log(new Date(e.timestamp).toISOString(), e.tags, e.data)
})

server.on('request', function(req, e){
  console.log(new Date(e.timestamp).toISOString(), e.tags, req.method, req.path, e.request)
})

server.on('internalError', function(request, err){
  console.error(new Date().toISOString(), err.message, err.stack, request.id, request.method, request.path)
})
