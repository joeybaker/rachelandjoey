import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Autosuggest from 'react-autosuggest'
import assign from 'lodash/object/assign'
import reject from 'lodash/collection/reject'
import includes from 'lodash/collection/includes'
import omit from 'lodash/object/omit'
import mapValues from 'lodash/object/mapValues'
const {shouldComponentUpdate} = addons.PureRenderMixin

const namespace = 'rsvpForm'
const plusTrue = 'yes'
const plusFalse = 'nope'
const regretRSVP = 'regrets'


export default class RsvpForm extends Component {
  constructor (props) {
    super(props)
    this.state = assign(
      {names: []}
      , this.convertPartyToState(props.party)
      , props
      , {submitButtonLabel: this.getSubmitButtonLabel(props.party)}
    )
  }

  componentWillReceiveProps (newProps) {
    const party = newProps.party
    const newState = {}

    if (party) assign(newState, this.convertPartyToState(party))
    if (newProps.hasOwnProperty('submitEnabled')) {
      newState.submitEnabled = newProps.submitEnabled
      newState.submitButtonLabel = this.getSubmitButtonLabel(party)
    }

    this.setState(newState)
  }

  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  getSubmitButtonLabel (party) {
    if (!party || party.attending === null) return 'RSVP'
    else return 'Change RSVP'
  }

  convertPartyToState (party) {
    if (!party) return {}

    const name1 = this.state ? this.state.name1 : party.names[0]
    const meal1 = party.attending === false ? regretRSVP : party.meals[name1]
    const names = reject(party.names, (name) => name === name1)
    const state = {meal1, names, party, name1}
    const confirmedNames = Object.keys(party.meals)
    names.forEach((name, i) => {
      // we start from 0, and we already have 1, so + 2
      const j = i + 2
      // -1 b/c we only start counting plusses from 1
      const plusKey = `plus${j - 1}`
      if (includes(confirmedNames, name)) {
        state[plusKey] = plusTrue
        state[`name${j}`] = name
        state[`meal${j}`] = party.meals[name]
      }
      // if we have other elible names
      else if (party.names.length > 1) {
        // if we have a previous submission, and there are other eligible names,
        // but they don't have meals, we must not have a plus one
        if (party.attending !== null) state[plusKey] = plusFalse
      }
    })
    return state
  }

  getSuggestionsMain (input, callback) {
    this.props.findNames(input, callback)
  }

  getSuggestionsSecondary (input, callback) {
    callback(null, this.state.names.filter((name) => {
      return includes(name.toLowerCase(), input.toLowerCase())
    }))
  }

  clearStateKeys (name, value) {
    const propKeys = Object.keys(this.props)
    const newState = mapValues(omit(this.state, propKeys), () => null)
    // yes, the party is a prop, but we still want to clear it if the name1 is
    // going to be changed
    newState.party = null

    // if passed a value to keey
    if (name) newState[name] = value

    this.setState(newState)
  }

  onSuggestionSelected (value, e) {
    // prevent the form from submitting
    e.preventDefault()

    // if this was a click instead of an enter press, we need to pull the name
    // and value out of the li
    const name = e.target.name || e.target.id
      .replace(/react-autosuggest-(.*?)-suggestion--[\d]{1,3}/, '$1')
    if (e.target.tagName.toLowerCase() === 'li') {
      this.setFormValue(name, value)
    }
    else {
      this.onInputChange(e)
    }

    if (name === 'name1') {
      this.props.onPartyNameSelect(value)
    }
  }

  onSuggestionInputChange (name) {
    return (value) => {
      // when the name is deleted, make sure to unset
      if (!value) this.setFormValue(name, value)

      if (name === 'name1') this.clearStateKeys(name, value)

      // we have to make sure the name1 is validated by auto-suggest, but
      // other names can be whatever the user wants
      if (name !== 'name1' && includes(value.trim(), ' ')){
        this.setFormValue(name, value)
      }
    }
  }

  onInputChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setFormValue(name, value)
  }

  setFormValue (name, value) {
    const newState = {[name]: value}
    // when the main name is changed, the whole state is now invalid
    if (name === 'name1') this.setState(assign(newState, {meal: null, name2: null, meal2: null, party: null}))
    else this.setState(newState)
  }

  onSubmit (e) {
    e.preventDefault()
    if (e.target.checkValidity()) {
      this.setState({submitEnabled: false, submitButtonLabel: 'sending…'})
      this.props.onSubmit(this.state)
    }
  }

  render () {
    const autosuggestInputAttrs = {
      required: true
      , placeholder: 'name'
      , disabled: !this.state.submitEnabled
    }
    const isNotRegrets = this.state.meal1 && this.state.meal1 !== regretRSVP

    const makeAutosuggest = (options = {}) => (
      <label>
        <Autosuggest
          id={options.name}
          suggestions={options.name === 'name1'
            ? this.getSuggestionsMain.bind(this)
            : this.getSuggestionsSecondary.bind(this)
          }
          inputAttributes={assign(
            {
              name: options.name
              , value: this.state[options.name]
              , onChange: this.onSuggestionInputChange.call(this, options.name)
            }
            , autosuggestInputAttrs
          )}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
        <span>{options.label}</span>
      </label>
    )

    const makeInput = (options = {}) => <input disabled={!this.state.submitEnabled} onChange={this.onInputChange.bind(this)} {...options} />
    const makeRadioInput = (options = {}) => makeInput(assign({type: 'radio'}, options))
    const buildRadioInput = (options = {}) => (
      <label>
        {makeRadioInput(assign(
          {
            value: options.value.toLowerCase()
            , checked: options.value.toLowerCase() === options.checkedValue
          }
          , options.inputOptions
        ))}
        <span>{options.value}</span>
      </label>
    )

    const mealChooser = (options = {}) => {
      const inputOptions = {required: true, name: options.name}
      const checkedValue = this.state[options.name]
      const rsvp = (
        <label>
          {makeRadioInput(assign({
            value: regretRSVP
            , checked: checkedValue === regretRSVP
          }, inputOptions))}
          <span>Sorry, I won't be coming</span>
        </label>
        )

      return (
      <fieldset>
        <span>{options.label}</span>
        {buildRadioInput({
          value: 'Chicken stuffed with sundried tomato, basil, and creamy garlic herb cheese'
          , checkedValue
          , inputOptions
        })}
        {buildRadioInput({
          value: 'New York strip steak, with gorgonzola cream sauce and chipotle sweet potatoes'
          , checkedValue
          , inputOptions
        })}
        {buildRadioInput({
          value: 'Cannelloni with spinach, goat cheese, and pine nuts'
          , checkedValue
          , inputOptions
        })}
        {options.addRSVP ? rsvp : ''}
      </fieldset>
      )
    }

    const plus1Chooser = (options = {}) => {
      const name = options.name
      const checkedValue = this.state[options.name]

      return (
      <fieldset>
        <span>{options.label}</span>
        {buildRadioInput({value: 'Yes', inputOptions: {name}, checkedValue})}
        {buildRadioInput({value: 'Nope', inputOptions: {name}, checkedValue})}
      </fieldset>
      )
    }

    const makeGuest = (index) => {
      // we're not counting guests from 0
      const count = index + 1
      const plusName = `plus${count}`
      const nameName = `name${count + 1}`
      const mealName = `meal${count + 1}`
      const out = []

      if (isNotRegrets && (this.state.names.length >= count)) {
        out.push(plus1Chooser({name: plusName, label: 'Bringing anyone else?'}))
      }

      if (isNotRegrets && this.state[plusName] === plusTrue) {
        out.push(makeAutosuggest({name: nameName, label: 'Who?'}))
      }

      if (this.state[nameName] && isNotRegrets) {
        out.push(mealChooser({label: 'They\'ll have', name: mealName}))
      }

      return out
    }

    const submit = <button type="submit" disabled={!this.state.submitEnabled}>{this.state.submitButtonLabel || this.props.submitButtonLabel}</button>

    const confirm = <p>Great! We look forward to seeing you.</p>

    const registry = <p>We have a <a href="http://www.amazon.com/registry/wedding/2IKOI1JN4B00E">small registry</a>, becuase we're lucky to already have a home together, so if you feel inclined, <a href="http://www.honeyfund.com/wedding/rachelandjoey2015">please give us a memory that will last a lifetime</a>.</p>

    const showSubmit =
      // we need at least a name and a meal
      this.state.name1
      && this.state.meal1
      // the first meal could be a regrest
      && (this.state.meal1 === regretRSVP
        //
        || this.state.names.reduce((guestsFilledOut, name, i) => {
          // we've already removed the first name from the array, and we start
          // from 0, so add 2
          const count = i + 2
          const nameName = `name${count}`
          const mealName = `meal${count}`
          const plusName = `plus${count - 1}`

          // if we've already found a false statement, we can just bail
          if (guestsFilledOut === false) return false

          // for each guest check if they've got a meal
          return !!(
            guestsFilledOut
            && (
              (
                // the guest is filled out
                this.state[nameName]
                && this.state[mealName]
                && this.state[plusName] === plusTrue
              )
              // the guest has been denied
              || this.state[plusName] === plusFalse
            )
            // the guest hasn't been filled out yet
            && this.state[plusName] !== void 0
          )
        }, true)
      )

    const showConfirm = this.state.party && this.state.party.attending
    const showRegistry = this.state.party && this.state.party.attending !== null

    return (<form className={namespace} onSubmit={this.onSubmit.bind(this)}>
      { /* name1 */
        makeAutosuggest({name: 'name1', label: 'Who are you?'})
      }
      { /* meal1 */
        this.state.name1 && this.state.party
        ? mealChooser({label: 'I\'ll have', name: 'meal1', addRSVP: true})
        : ''
      }
      {(this.state.names || []).map((name, i) => makeGuest(i))}
      {showSubmit ? submit : ''}
      {showConfirm ? confirm : ''}
      {showRegistry ? registry : ''}
      <p className={`${namespace}-rsvpWarning`}>
        <small>Please RSVP by August 1<sup>st</sup></small>
      </p>
    </form>)
  }
}

RsvpForm.propTypes = {
  findNames: PropTypes.func.isRequired
  , onPartyNameSelect: PropTypes.func.isRequired
  , onSubmit: PropTypes.func.isRequired
  , submitButtonLabel: PropTypes.string
  , submitEnabled: PropTypes.bool
  , party: PropTypes.object
}

RsvpForm.defaultProps = {
  submitButtonLabel: 'RSVP'
  // aug 1st at midnight
  , submitEnabled: Date.now() < 1438498799000
}
