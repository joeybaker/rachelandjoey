import React, {PropTypes, Component, Children} from 'react'
import {addons} from 'react/addons'
import identity from 'lodash/utility/identity'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'cardRow'

export default class CardRow extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<div className={namespace}>
      {Children.map(this.props.children, identity)}
    </div>)
  }
}

CardRow.propTypes = {
  children: PropTypes.any
}
