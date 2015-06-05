import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import RsvpForm from '../rsvp-form/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'pageRsvp'

export default class PageRsvp extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<div className={namespace}>
      <RsvpForm />
    </div>)
  }
}

PageRsvp.propTypes = {
}
