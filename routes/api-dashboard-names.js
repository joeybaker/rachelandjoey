import mapValues from 'lodash/object/mapValues'

const simplifyMeal = (meal) => {
  if (!meal) return meal
  else if (meal.includes('chicken')) return 'chicken'
  else if (meal.includes('steak')) return 'steak'
  else return 'vegie'
}

export default {
  path: '/api/dashboard/names'
  , method: 'GET'
  , config: {
    handler: (req, reply) => {
      const {r, conn} = req.server.plugins.rethinkdb

      r.db('rachelandjoey').table('rsvp')
        .group('attending')
        .map((party) => party('meals'))
        .reduce((out, meals) => out.merge(meals))
        .ungroup()
        .map((agg) => {
          return agg
            .merge({
              names: agg('reduction')
              , attending: agg('group')
            })
            .without('reduction', 'group')
        })
        .run(conn, (err, cursor) => {
          if (err) reply(err)
          else {
            cursor.toArray((cursorErr, attendingGroups) => {
              if (cursorErr) {
                reply(cursorErr)
              }
              else {
                reply(attendingGroups.map(group => {
                  group.names = mapValues(group.names, simplifyMeal)
                  return group
                }))
              }
            })
          }
        })
    }
    , tags: ['api', 'dashbaord', 'read']
    , description: 'returns an array of names and meals grouped by attending. Designed to not repeat data so that the payload is small'
  }
}

