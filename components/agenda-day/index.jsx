import React, {PropTypes, Component} from 'react'
import map from 'lodash/collection/map'
import AgendaEvent from '../agenda-event/'
const namespace = 'agendaDay'

export default class AgendaDay extends Component {
  render () {
    return (<li className={namespace}>
      <strong className={`${namespace}-title`}>{this.props.date}</strong>
      <ol className={`${namespace}-events`}>
        {map(this.props.events, (event) => <AgendaEvent event={event} key={event.title}/>)}
      </ol>
    </li>)
  }
}

AgendaDay.propTypes = {
  events: PropTypes.array.isRequired
  , date: PropTypes.string.isRequired
}
