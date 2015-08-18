import React, {PropTypes, Component} from 'react'
import groupBy from 'lodash/collection/groupBy'
import map from 'lodash/collection/map'
import AgendaDay from '../agenda-day/'
import CardRow from '../card-row/'
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
    return groupBy(events, (event) => event.hardDay)
  }

  render () {
    const events = this.state.events
    return (<CardRow className={namespace}>
      {map(events, (eventList, date) => <AgendaDay events={eventList} date={date} key={date} />)}
    </CardRow>)
  }
}

Agenda.propTypes = {
  events: PropTypes.array.isRequired
}
