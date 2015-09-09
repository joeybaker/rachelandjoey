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
    const deadline = moment('2015-09-06 16:30:00.000-07:00')
    const timeRemaining = this.getTimeRemaining(deadline)

    this.state = {
      deadline
      , timeRemaining
    }
  }

  componentDidMount () {
    this.timeInterval = setInterval(() => {
      this.setState({timeRemaining: this.getTimeRemaining()})
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timeInterval)
  }

  getTimeRemaining (deadline) {
    const date = deadline || this.state.deadline
    if (date.valueOf() > Date.now()) return date.fromNow()
    else return date.fromNow()
  }

  render () {
    setHead({title: this.props.title})
    return (
      <div className={namespace}>
        <div className={`${namespace}-banner`}>
          <img
            src="https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1200/v1433822967/engagement-2_psdygp.jpg"
            srcSet="
            https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2000/v1433822967/engagement-2_psdygp.jpg 2x
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_4000/v1433822967/engagement-2_psdygp.jpg 3x
            "
            sizes="100vw"
            alt="Rachel & Joey"
          />
          <h1 className={`${namespace}-title`}>{this.state.timeRemaining}</h1>
        </div>
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
