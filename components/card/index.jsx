import React, {PropTypes, Component, Children} from 'react'
import {addons} from 'react/addons'
import classnames from 'classnames'
import identity from 'lodash/utility/identity'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'card'

export default class Card extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    const classes = classnames(namespace, {
      [`${namespace}-${this.props.style}`]: this.props.style
    })

    return (<div className={classes}>
      {Children.map(this.props.children, identity)}
    </div>)
  }
}

Card.propTypes = {
  style: PropTypes.oneOf(['inverted', 'normal'])
  , children: PropTypes.any
}
