import React, {PropTypes, Component} from 'react'
const namespace = 'agendaEvent'

export default class AgendaEvent extends Component {
  renderHour (timestamp, timeString) {
    const date = new Date(timestamp)
    return <time dateTime={date.toISOString()}>{timeString}</time>
  }

  render () {
    const event = this.props.event
    const location = event.location

    return (
      <li className={namespace}>
        <p className={`${namespace}-title`}>
          <span className={`${namespace}-title-text`}>{event.title}</span>
          <span className={`${namespace}-title-time`}>
            {this.renderHour(event.start, event.hardStart)}-{this.renderHour(event.end, event.hardEnd)}
          </span>
        </p>
        <p className={`${namespace}-locationName`}>{location.name}</p>
        <p className={`${namespace}-locationAddress`}>{location.street}, {location.city} {location.state} {location.zip}</p>
        <p className={`${namespace}-description`}>{event.description}</p>
      </li>
    )
  }
}

AgendaEvent.propTypes = {
  event: PropTypes.object.isRequired
}
