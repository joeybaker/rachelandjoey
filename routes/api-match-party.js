export default {
  path: '/api/match/party/{query}'
  , method: 'GET'
  , config: {
    handler: (req, reply) => {
      const {r, conn} = req.server.plugins.rethinkdb
      const {query} = req.params

      r.table('rsvp')
        .getAll(query, {index: 'names'})
        .run(conn, (err, cursor) => {
          if (err) reply(err)
          else {
            cursor.toArray((cursorErr, parties)=>{
              if (cursorErr) reply(cursorErr)
              else reply(parties[0])
            })
          }
        })
    }
    , tags: ['api', 'rsvp', 'read']
    , description: 'given a name, find it in rsvp table and return the party'
  }
}
