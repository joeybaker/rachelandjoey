import React, {PropTypes, Component, Children} from 'react'
import TransitiveNumber from 'react-transitive-number'
import {addons} from 'react/addons'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'dashboardStats'

const stats = ['confirmed', 'regrets', 'unheard', 'steak', 'chicken', 'vegie']

export default class DashboardStats extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<div className={namespace}>
      <ul className={`${namespace}-stats`}>
        {Children.map(stats, (stat) => {
          return (<li className={`${namespace}-stat`}>
            <TransitiveNumber className={`${namespace}-statNumber`}>
              {this.props.stats[stat]}
            </TransitiveNumber>
            <span className={`${namespace}-statTitle`}>{stat}</span>
          </li>)
        })}
      </ul>
    </div>)
  }
}

DashboardStats.propTypes = {
  stats: PropTypes.object.isRequired
}

DashboardStats.defaultProps = {
  stats: {}
}
