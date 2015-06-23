import React, {Component} from 'react'
import {addons} from 'react/addons'
import RsvpForm from '../rsvp-form/'
import take from 'lodash/array/take'
import first from 'lodash/array/first'
import xhr from 'xhr'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'rsvpWrap'

const hasStorage = process.browser && !!window.localStorage && !!window.localStorage.setItem

export default class RsvpWrap extends Component {
  constructor () {
    super()

    this.state = {}
    if (hasStorage) {
      const raw = window.localStorage.getItem(namespace)
      if (raw) this.state.party = JSON.parse(raw)
    }
  }

  componentWillMount () {
    if (hasStorage && this.state.party) {
      this.setParty(first(this.state.party.names))
    }
  }

  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  convertStateToParty (state) {
    const party = {meals: {}, names: [], id: state.party.id}
    const nameKeyRegEx = /^name\d$/
    const nameKeys = Object.keys(state).filter((key) => nameKeyRegEx.test(key))
    party.attending = state.meal1 !== 'regrets'

    nameKeys.forEach((nameKey, i) => {
      const name = state[nameKey]
      const meal = state[`meal${i + 1}`]
      if (name) {
        party.meals[name] = meal
        party.names.push(name)
      }
    })

    return party
  }

  findNames (input, callback) {
    if (input.length < 2) return void callback(null, [])

    xhr({
      url: `/api/match/name/${input}`
      , encoding: null
      , json: true
    }, (err, res, body) => {
      if (err) {
        console.error(err)
        callback(null, [err.toString()])
      }
      else callback(null, take(body, 5))
    })
  }

  setParty (name) {
    xhr({
      url: `/api/match/party/${name}`
      , encoding: null
      , json: true
    }, (err, res, party) => {
      if (err) return void console.error(err)

      if (process.browser && window.heap) {
        window.heap.identify({name, party: party.id})
      }
      this.setState({party})
    })
  }

  onSubmit (state) {
    const party = this.convertStateToParty(state)
    xhr({
      url: `/api/update/party`
      , encoding: null
      , json: party
      , method: 'POST'
    }, (err, res, savedParty) => {
      if (err) console.error(err)
      else if (res.statusCode >= 300) console.error(savedParty)
      else {
        if (hasStorage) {
          window.localStorage.setItem(namespace, JSON.stringify(savedParty))
        }

        this.setState({party: savedParty, submitEnabled: true})
      }
    })
  }

  render () {
    return (<div className={namespace}>
      <h2>RSVP</h2>
      <RsvpForm
        findNames={this.findNames}
        onPartyNameSelect={this.setParty.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        submitEnabled={this.state.submitEnabled}
        party={this.state.party}
      />
    </div>)
  }
}

RsvpWrap.propTypes = {
}
