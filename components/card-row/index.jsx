import React, {PropTypes, Component, Children} from 'react'
import {addons} from 'react/addons'
import identity from 'lodash/utility/identity'
import classnames from 'classnames'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'cardRow'

export default class CardRow extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    const classes = classnames(namespace, {
      [`${this.props.className}`]: this.props.className
    })

    return (<div {...this.props} className={classes}>
      {Children.map(this.props.children, identity)}
    </div>)
  }
}

CardRow.propTypes = {
  children: PropTypes.node
  , className: PropTypes.string
}
