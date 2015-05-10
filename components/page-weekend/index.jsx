import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Agenda from '../agenda/'
import WhereTo from '../widgets-where-to/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'pageWeekend'

export default class PageWeekend extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    return (<div className={namespace}>
      <Agenda events={this.props.events} />
      <WhereTo activities={this.props.activities} />
    </div>)
  }
}

PageWeekend.propTypes = {
  events: PropTypes.array.isRequired
  , activities: PropTypes.array.isRequired
}
