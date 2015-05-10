import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import WhereTo from '../widget-where-to/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'widgetsWhereTo'

export default class WidgetsWhereTo extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    const activities = this.props.activities.map((activity) => <WhereTo {...activity} key={activity.verb} />)
    return (<div className={namespace}>
      {activities}
    </div>)
  }
}

WidgetsWhereTo.propTypes = {
  activities: PropTypes.array.isRequired
}

WidgetsWhereTo.defaultProps = {
  activities: []
}
