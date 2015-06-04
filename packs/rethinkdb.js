import hapiRethinkdb from '@joeybaker/hapi-rethinkdb'
import assign from 'lodash/object/assign'

const initRethinkdb = function initRethinkdb (server, callback) {
  const options = assign({
    db: 'rachelandjoey'
    // yea, this is hardcoded for docker
    , host: process.env.RDB_PORT_28015_TCP_ADDR
    , table: {
      name: 'rsvp'
      , indexes: [{
        name: 'names'
        , multi: true
      }]
    }
  }, server.app.config.rethinkdb)

  server.register({
    register: hapiRethinkdb
    , options
  }, callback)
}

export default initRethinkdb
