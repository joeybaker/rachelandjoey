import React, {Component} from 'react'
import {RouteHandler, Link} from 'react-router'
const namespace = 'entry'

export default class Entry extends Component {
  render () {
    return (<div className={namespace}>
      <nav className={`${namespace}-nav`}>
        <Link to="rsvp" className={`${namespace}-link`}>RSVP</Link>
        <Link to="home" className={`${namespace}-link ${namespace}-link--home`}>Rachel <span className={`${namespace}-amp`}>&</span> Joey</Link>
        <Link to="weekend" className={`${namespace}-link`}>Weekend</Link>
      </nav>
      <div className={`${namespace}-content`}>
        <RouteHandler {...this.props} />
      </div>
    </div>)
  }
}
