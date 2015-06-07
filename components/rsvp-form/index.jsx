import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Autosuggest from 'react-autosuggest'
import assign from 'lodash/object/assign'
import reject from 'lodash/collection/reject'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'rsvpForm'


export default class RsvpForm extends Component {
  constructor (props) {
    super(props)
    // aug 1st at midnight
    const enabled = Date.now() < 1438498799000

    this.state = assign(
      {submitEnabled: enabled}
      , this.convertPartyToState(props.party)
      , props
      , {submitButtonLabel: props.party ? 'Change RSVP' : 'RSVP'}
    )
  }

  componentWillReceiveProps (newProps) {
    const party = newProps.party
    if (party) this.setState(this.convertPartyToState(party))
  }

  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  convertPartyToState (party) {
    if (!party) return {}

    const name1 = this.state ? this.state.name1 : party.names[0]
    const meal1 = party.attending === false ? 'regrets' : party.meals[name1]
    const names = reject(party.names, (name) => name === name1)
    return {meal1, names, party, name1}
  }

  getSuggestionsMain (input, callback) {
    this.props.findNames(input, callback)
  }

  getSuggestionsSecondary (input, callback) {
    callback(null, this.state.names.filter((name) => {
      return name.toLowerCase().includes(input.toLowerCase())
    }))
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

      // we have to make sure the name1 is validated by auto-suggest, but
      // other names can be whatever the user wants
      if (name !== 'name1' && name.trim().includes(' ')){
        this.setFormValue(name, value)
      }
    }
  }

  onInputChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setFormValue(name, value)
    console.log(name, value)
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
            value: 'regrets'
            , checked: checkedValue === 'regrets'
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

    const submit = <button type="submit" disabled={!this.state.submitEnabled}>{this.state.submitButtonLabel || this.props.submitButtonLabel}</button>

    return (<form className={namespace} onSubmit={this.onSubmit.bind(this)}>
      {makeAutosuggest({name: 'name1', label: 'Who are you?'})}
      {
        this.state.name1 && this.props.party
        ? mealChooser({label: 'I\'ll have', name: 'meal1', addRSVP: true})
        : ''
      }
      {
        this.state.meal1 && this.state.meal1 !== 'regrets' && (this.state.names && this.state.names.length > 0)
        ? plus1Chooser({name: 'plus1', label: 'Bringing anyone else?'})
        : ''
      }
      {
        this.state.plus1 === 'yes' && this.state.meal1 && this.state.meal1 !== 'regrets'
        ? makeAutosuggest({name: 'name2', label: 'Who?'})
        : ''
      }
      {
        this.state.name2 && this.state.meal1 !== 'regrets'
        ? mealChooser({label: 'They\'ll have', name: 'meal2'})
        : ''
      }
      {
        this.state.meal2 || this.state.meal1 === 'regrets' || this.state.plus1 === 'nope' || (this.state.names && this.state.names.length === 0 && this.state.meal1)
        ? submit
        : ''
      }
      <p>
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
  , party: PropTypes.object
}

RsvpForm.defaultProps = {
  submitButtonLabel: 'RSVP'
}
