import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Autosuggest from 'react-autosuggest'
import assign from 'lodash/object/assign'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'rsvpForm'

const hasStorage = process.browser && !!window.localStorage && !!window.localStorage.setItem

export default class RsvpForm extends Component {
  constructor (props) {
    super()
    let stored = {}

    if (hasStorage) {
      const raw = window.localStorage.getItem(namespace)
      if (raw) stored = JSON.parse(raw)
    }

    // aug 1st at midnight
    const enabled = Date.now() < 1438498799000

    this.state = assign(
      stored
      , {submitEnabled: enabled, submitButtonLabel: 'RSVP'}
      , props
    )
  }
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  getSuggestionsMain (input, callback) {
    this.props.findNames(input, callback)
  }

  getSuggestionsSecondary (input, callback) {
    this.props.findRelatedName(input, callback)
  }

  onSuggestionSelected (value, e) {
    // prevent the form from submitting
    e.preventDefault()

    // if this was a click instead of an enter press, we need to pull the name
    // and value out of the li
    if (e.target.tagName.toLowerCase() === 'li') {
      const name = e.target.id
        .replace(/react-autosuggest-(.*?)-suggestion--[\d]{1,3}/, '$1')
      this.setFormValue(name, value)
    }
    else {
      this.onInputChange(e)
    }
  }

  onInputChange (e) {
    this.setFormValue(e.target.name, e.target.value)
  }

  setFormValue (name, value) {
    this.setState({[name]: value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (e.target.checkValidity()) {
      if (hasStorage) {
        window.localStorage.setItem(namespace, JSON.stringify(this.state))
      }
      this.setState({submitEnabled: false, submitButtonLabel: 'sending…'})
      console.log(this.state)
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
          suggestions={options.name.includes('main')
            ? this.getSuggestionsMain.bind(this)
            : this.getSuggestionsSecondary.bind(this)
          }
          inputAttributes={assign(
            {name: options.name, value: this.state[options.name]}
            , autosuggestInputAttrs
          )}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
        <span>{options.label}</span>
      </label>
    )

    const makeInput = (options = {}) => <input disabled={!this.state.submitEnabled} onChange={this.onInputChange.bind(this)} {...options} />
    const makeRadioInput = (options = {}) => makeInput(assign({type: 'radio'}, options))

    const mealChooser = (options = {}) => {
      const inputOptions = {required: true, name: options.name}
      const checkedValue = this.state[options.name]
      const buildRadioInput = (value) => (
        <label>
          {makeRadioInput(assign(
            {
              value: value.toLowerCase()
              , checked: value.toLowerCase() === checkedValue
            }
            , inputOptions
          ))}
          <span>{value}</span>
        </label>
      )
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
        {buildRadioInput('Chicken stuffed with sundried tomato, basil, and creamy garlic herb cheese')}
        {buildRadioInput('New York strip steak, with gorgonzola cream sauce and chipotle sweet potatoes')}
        {buildRadioInput('Cannelloni with spinach, goat cheese, and pine nuts')}
        {options.addRSVP ? rsvp : ''}
      </fieldset>
      )
    }

    const submit = <button type="submit" disabled={!this.state.submitEnabled}>{this.state.submitButtonLabel}</button>

    return (<form className={namespace} onSubmit={this.onSubmit.bind(this)}>
      {makeAutosuggest({name: 'mainname', label: 'Who are you?'})}
      {
        this.state.mainname
        ? mealChooser({label: 'I\'ll have', name: 'meal', addRSVP: true})
        : ''
      }
      {
        this.state.meal && this.state.meal !== 'regrets'
        ? makeAutosuggest({name: 'secondname', label: 'Bringing anyone?'})
        : ''
      }
      {
        this.state.secondname
        ? mealChooser({label: 'They\'ll have', name: 'meal2'})
        : ''
      }
      {
        this.state.meal2 || this.state.meal === 'regrets'
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
  , findRelatedName: PropTypes.func.isRequired
}
