process.title = 'rachelandjoey'

import hapi from 'hapi'
import path from 'path'
import jace from 'jace'
import bulkRequire from 'bulk-require'
import each from 'lodash/collection/each'
import values from 'lodash/object/values'
import after from 'lodash/function/after'
import size from 'lodash/collection/size'

const packs = bulkRequire(__dirname, ['packs/*.js']).packs
const routes = bulkRequire(__dirname, ['routes/*.js']).routes
const config = jace({
  configPath: path.join(__dirname, 'config')
})

// setup server
const server = new hapi.Server()
server.app.config = config

const connectionOptions = {port: 8000}
if (config.nodeEnv === 'development') connectionOptions.host = 'localhost'
server.connection(connectionOptions)

// add routes
const loadRoutes = () => {
  server.log(['server', 'init', 'info'], {message: 'loading routes'})
  server.route(values(routes))
  server.log(['server', 'init', 'info', 'ok'], {message: 'routes loaded'})
}

// load in packs and start server
const startServer = after(size(packs), () => {
  server.log(['server', 'init', 'info', 'ok'], {message: 'packs loaded'})
  loadRoutes()
  server.start(() => server.log(['server', 'init', 'info', 'ok'], server.info))
})
server.log(['server', 'init', 'info'], {message: 'loading packs'})
each(packs, (pack, packName) => {
  server.log(['server', 'init', 'info', packName], {message: 'starting'})
  pack(server, startServer)
})
