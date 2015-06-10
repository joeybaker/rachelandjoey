import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import RsvpWrap from '../rsvp-wrap/'
import setHead from 'react-document-head'
const namespace = 'home'

// format moment strings
moment.locale('en', {
  calendar: {
    lastDay: '[Yesterday at] LT'
    , sameDay: '[Today at] LT'
    , nextDay: '[Tomorrow at] LT'
    , lastWeek: '[last] dddd [at] LT'
    , nextWeek: 'dddd [at] LT'
    , sameElse: 'Do MMMM, YYYY'
  }
})

export default class Home extends Component {
  constructor () {
    super()
    const deadline = moment([2015, 8, 6])
    const timeRemaining = this.getTimeRemaining(deadline)

    this.state = {
      deadline
      , timeRemaining
    }
  }

  getTimeRemaining (deadline) {
    const date = deadline || this.state.deadline
    if (date.valueOf() > Date.now()) return date.calendar()
    else return date.fromNow()
  }

  componentDidMount () {
    this.timeInterval = setInterval(() => {
      this.setState({timeRemaining: this.getTimeRemaining()})
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timeInterval)
  }

  render () {
    setHead({title: this.props.title})
    return (
      <div className={namespace}>
        <h1 className={`${namespace}-title`}>{this.state.timeRemaining}</h1>
        <RsvpWrap />
      </div>
    )
  }
}

Home.propTypes = {
  title: PropTypes.string
}

Home.defaultProps = {
  title: 'Rachel & Joey'
}
