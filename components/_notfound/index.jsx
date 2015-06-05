import React, {Component} from 'react'
import {addons} from 'react/addons'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'notfound'

export default class Notfound extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<div className={namespace}>
      <h1 className={`${namespace}-title`}>404</h1>
      <img src={`http://huh.jpg.to`} />
    </div>)
  }
}
