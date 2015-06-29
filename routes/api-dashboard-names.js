import query from '../queries/dashboard-names.js'

export default {
  path: '/api/dashboard/names'
  , method: 'GET'
  , config: {
    handler: (req, reply) => {
      const {r, conn} = req.server.plugins.rethinkdb
      query(r, conn, reply)
    }
    , tags: ['api', 'dashbaord', 'read']
    , description: 'returns an array of names and meals grouped by attending. Designed to not repeat data so that the payload is small'
  }
}
