// {
//   id: 'partyanme'
//   , names: [
//     'name name'
//     'name name'
//   ]
//   , attending: false
//   , meals: {
//     name: 'meal'
//   }
// }

import _ from 'lodash'
import path from 'path'

const raw = require(path.join(__dirname, '..', 'guests-raw.json'))

const formatted = _(raw)
  .groupBy('partyName')
  .map((persons, party) => {
    const id = 'party:' + _.kebabCase(party)
    const names = persons.map((person) => `${person.firstName} ${person.lastName}`)
    return {id, names, attending: null, meals: {}}
  })
  .value()

console.log(JSON.stringify(formatted, null, 2))
