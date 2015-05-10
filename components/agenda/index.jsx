import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import groupBy from 'lodash/collection/groupBy'
import map from 'lodash/collection/map'
import AgendaDay from '../agenda-day/'
const namespace = 'agenda'

export default class Agenda extends Component {
  constructor (props) {
    super(props)
    this.state = {events: this.groupByDay(props.events)}
  }

  componentWillRecieveProps (props) {
    this.setState({events: this.groupByDay(props.events)})
  }

  // helpers
  groupByDay (events) {
    return groupBy(events, (event) => moment(event.start).format('ddd, MMMM Do'))
  }

  render () {
    const events = this.state.events
    return (<ol className={namespace}>
      {map(events, (eventList, date) => <AgendaDay events={eventList} date={date} key={date} />)}
    </ol>)
  }
}

Agenda.propTypes = {
  events: PropTypes.array.isRequired
}
