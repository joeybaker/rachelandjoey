import joi from 'joi'
import boom from 'boom'
import size from 'lodash/collection/size'

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
      else if (size(req.payload.meals) !== party.names.length) {
        req.log(['warn', path, 'hackish'], {message: 'not enough meals', payload})
        callback(boom.notAcceptable('We need to know who\'s eat what!'))
      }
      else callback()
    })
}

const updateParty = (r, conn, req, callback) => {
  const {payload} = req
  const {id} = payload

  r.table('rsvp').get(id)
    .update(payload, {returnChanges: true}).run(conn, (err, res) => {
      if (err) {
        req.log(['error', path, 'rethink'], err)
        callback(err)
      }
      else {
        req.log(['info', path, 'rethink', 'update'], res)
        callback(null, res)
      }
    })
}

const handler = (req, reply) => {
  const {r, conn} = req.server.plugins.rethinkdb

  validateParty(r, conn, req, (validateErr) => {
    if (validateErr) reply(validateErr)
    else updateParty(r, conn, req, reply)
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
