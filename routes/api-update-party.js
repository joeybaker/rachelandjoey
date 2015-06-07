import joi from 'joi'
import boom from 'boom'
import size from 'lodash/collection/size'
import assign from 'lodash/object/assign'
import uniq from 'lodash/array/uniq'

const path = '/api/update/party'
const validate = {
  payload: {
    id: joi.string().required()
    , names: joi.array().items(joi.string().max(50)).min(1).max(5).required()
    , meals: joi.object().required()
    , attending: joi.boolean().required()
  }
}

const validateParty = (r, conn, req, callback) => {
  const {payload} = req
  const {id} = payload
  r.table('rsvp').get(id)
    .run(conn, (err, party) => {
      if (err) {
        req.log(['error', path, 'rethink'], err)
        callback(err)
      }
      else if (!party) {
        req.log(['warn', path, 'hackish'], {message: 'id not found', payload})
        callback(boom.forbidden('who are you!?'))
      }
      else if (req.payload.names.length > party.names.length){
        req.log(['warn', path, 'hackish'], {message: 'too many names', payload})
        callback(boom.notAcceptable('Too many guests'))
      }
      else if (size(req.payload.meals) !== req.payload.names.length) {
        req.log(['warn', path, 'hackish'], {message: 'not enough meals', payload})
        callback(boom.notAcceptable('We need to know who\'s eat what!'))
      }
      else callback(null, party)
    })
}

const updateParty = (r, conn, req, party, callback) => {
  const {payload} = req
  const {id} = payload
  // ensure that we don't remove the guest count from the original list of names
  // we have the acuurate names in meals
  const names = uniq(payload.names.concat(party.names))
  const updatedParty = assign({}, payload, {names})

  r.table('rsvp').get(id)
    .update(updatedParty, {returnChanges: true}).run(conn, (err, res) => {
      if (err) {
        req.log(['error', path, 'rethink'], err)
        callback(err)
      }
      else {
        req.log(['info', path, 'rethink', 'update', 'ok'], res)
        callback(null, updatedParty)
      }
    })
}

const handler = (req, reply) => {
  const {r, conn} = req.server.plugins.rethinkdb

  validateParty(r, conn, req, (validateErr, party) => {
    if (validateErr) reply(validateErr)
    else updateParty(r, conn, req, party, reply)
  })
}

export default {
  path
  , method: 'POST'
  , config: {
    validate
    , handler
  }
}
