import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Card from '../card/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'widgetWhereTo'

export default class WidgetWhereTo extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<Card style="inverted">
      <a className={namespace} href={this.props.link}>
        <h3 className={`${namespace}-title`}>Where To {this.props.verb}</h3>
        <p className={`${namespace}-description`}>{this.props.description}</p>
        <p className={`${namespace}-link`} href={this.props.link}>{this.props.cta}</p>
      </a>
    </Card>)
  }
}

WidgetWhereTo.propTypes = {
  verb: PropTypes.string.isRequired
  , description: PropTypes.string.isRequired
  , link: PropTypes.string.isRequired
  , cta: PropTypes.string.isRequired
}
