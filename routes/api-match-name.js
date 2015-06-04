export default {
  path: '/api/match/name/{query}'
  , method: 'GET'
  , handler: (req, reply) => {
    const {r, conn} = req.server.plugins.rethinkdb
    const {query} = req.params

    r.table('rsvp')
      .concatMap((party) => {
        return party('names')
      })
      .filter((name) => {
        return name.downcase().match(query.toLowerCase())
      })
      .run(conn, (err, cursor) => {
        if (err) return void reply(err)
        else {
          cursor.toArray(reply)
        }
      })
  }
}
