import mapValues from 'lodash/object/mapValues'

const simplifyMeal = (meal) => {
  if (!meal) return meal
  else if (meal.includes('chicken')) return 'chicken'
  else if (meal.includes('steak')) return 'steak'
  else return 'vegie'
}

export default (r, conn, callback) => {
  r.db('rachelandjoey').table('rsvp')
    .group('attending')
    .map((party) => {
      return r.branch(
        // check for meals
        party('meals').keys().count().gt(0)
        // if meals, use that
        , party('meals')
        // else, make the names look like meals
        , party('names')
          .map((name) => r.object(name, null))
          .reduce((out, meals) => out.merge(meals))
      )
    })
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
      if (err) callback(err)
      else {
        cursor.toArray((cursorErr, attendingGroups) => {
          if (cursorErr) {
            callback(cursorErr)
          }
          else {
            callback(null, attendingGroups.map(group => {
              group.names = mapValues(group.names, simplifyMeal)
              return group
            }))
          }
        })
      }
    })
}
