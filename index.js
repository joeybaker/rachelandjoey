process.title = 'rachelandjoey'


import hapi from 'hapi'
const path = require('path')
  , jace = require('jace')
  , config = jace({
    configPath: path.join(__dirname, 'config')
  })
  , bulkRequire = require('bulk-require')
  , server = new hapi.Server()
  , packs = bulkRequire(__dirname, ['packs/*.js']).packs
  , routes = bulkRequire(__dirname, ['routes/*.js']).routes
  , _ = require('lodash')

server.app.config = config

const connectionOptions = {port: 8000}
if (config.nodeEnv === 'development') connectionOptions.host = 'localhost'
server.connection(connectionOptions)


server.route(_.values(routes))

const startServer = _.after(_.size(packs), function startServer () {
  server.start(function serverStarted () {
    server.log(['server', 'init'], server.info)
  })
})
_.each(packs, function startPack (pack) {
  pack(server, startServer)
})
