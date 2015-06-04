import hapiRethinkdb from '@joeybaker/hapi-rethinkdb'

const initRethinkdb = function initRethinkdb (server, callback) {
  server.register({
    register: hapiRethinkdb
    , options: {
      // db: 'rachelandjoey'
      url: 'rethinkdb://192.168.99.100:32768/rachelandjoey'
      , table: {
        name: 'rsvp'
        , indexes: [{
          name: 'names'
          , multi: true
        }]
      }
    }
  }, callback)
}

export default initRethinkdb
