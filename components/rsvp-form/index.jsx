import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Autosuggest from 'react-autosuggest'
import assign from 'lodash/object/assign'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'rsvpForm'

export default class RsvpForm extends Component {
  constructor (props) {
    super()
    this.state = assign({submitEnabled: true, submitButtonLabel: 'Done'}, props)
  }
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  getSuggestions (input, callback) {
    callback(null, ['billy', 'bobby', 'sammy'])
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
    console.log(name, value)
    this.setState({[name]: value})
  }

  onSubmit (e) {
    e.preventDefault()
    console.log(e.target.checkValidity())
    if (e.target.checkValidity()) {
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

    const makeInput = (options = {}) => <input disabled={!this.state.submitEnabled} onChange={this.onInputChange.bind(this)} {...options} />
    const makeRadioInput = (options = {}) => makeInput(assign({type: 'radio'}, options))

    const mealChooser = (options = {}) => {
      const inputOptions = {required: true, name: options.name}
      const rsvp = (
        <label>
          {makeRadioInput(assign({value: false}, inputOptions))}
          <span>Sorry, won't be coming</span>
        </label>
        )

      return (
      <fieldset>
        <span>{options.label}</span>
        <label>
          {makeRadioInput(assign({value: 'chicken'}, inputOptions))}
          <span>Chicken</span>
        </label>
        <label>
          {makeRadioInput(assign({value: 'steak'}, inputOptions))}
          <span>Steak</span>
        </label>
        <label>
          {makeRadioInput(assign({value: 'vegie'}, inputOptions))}
          <span>Vegie</span>
        </label>
        {options.addRSVP ? rsvp : ''}
      </fieldset>
      )
    }

    return (<form className={namespace} onSubmit={this.onSubmit.bind(this)}>
      <label>
        <Autosuggest
          id="mainname"
          suggestions={this.getSuggestions}
          inputAttributes={assign({name: 'mainname'}, autosuggestInputAttrs)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
        <span>Who are you?</span>
      </label>
      {mealChooser({label: 'I\'ll have', name: 'meal', addRSVP: true})}
      <label>
        <Autosuggest
          id="secondname"
          suggestions={this.getSuggestions}
          inputAttributes={assign({name: 'secondname'}, autosuggestInputAttrs)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
        <span>Bringing anyone?</span>
      </label>
      {mealChooser({label: 'They\'ll have', name: 'meal2'})}
      <button type="submit" disabled={!this.state.submitEnabled}>{this.state.submitButtonLabel}</button>
    </form>)
  }
}

RsvpForm.propTypes = {
  name: PropTypes.string.isRequired
}
