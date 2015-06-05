import React, {Component} from 'react'
import moment from 'moment'
import css from '../variables/css.js'

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

  styles () {
    return {
      h1: {
        WebkitFontSmoothing: 'antialiased'
        , fontWeight: 300
        , fontSize: '10vw'
        , margin: 0
      }
      , container: {
        justifyContent: 'center'
        , WebkitJustifyContent: 'center'
        , WebkitAlignItems: 'center'
        , height: '100%'
        , textAlign: 'center'
      }
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
    const styles = this.styles()

    return (
      <div className="flex" style={styles.container}>
        <h1 style={styles.h1}>{this.state.timeRemaining}</h1>
      </div>
    )
  }
}
