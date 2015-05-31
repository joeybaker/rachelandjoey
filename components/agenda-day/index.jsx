import React, {PropTypes, Component} from 'react'
import map from 'lodash/collection/map'
import AgendaEvent from '../agenda-event/'
import Card from '../card/'
const namespace = 'agendaDay'

export default class AgendaDay extends Component {
  render () {
    return (<Card className={namespace}>
      <strong className={`${namespace}-title`}>{this.props.date}</strong>
      <ol className={`${namespace}-events`}>
        {map(this.props.events, (event) => <AgendaEvent event={event} key={event.title}/>)}
      </ol>
    </Card>)
  }
}

AgendaDay.propTypes = {
  events: PropTypes.array.isRequired
  , date: PropTypes.string.isRequired
}
