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
            src="https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_800/v1433822967/engagement-2_psdygp.jpg"
            srcSet="
            https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_640/v1433822967/engagement-2_psdygp.jpg 320w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_750/v1433822967/engagement-2_psdygp.jpg 375w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1242/v1433822967/engagement-2_psdygp.jpg 414w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_960/v1433822967/engagement-2_psdygp.jpg 480w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1024/v1433822967/engagement-2_psdygp.jpg 640w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1334/v1433822967/engagement-2_psdygp.jpg 667w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2208/v1433822967/engagement-2_psdygp.jpg 736w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1536/v1433822967/engagement-2_psdygp.jpg 768w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_800/v1433822967/engagement-2_psdygp.jpg 800w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2048/v1433822967/engagement-2_psdygp.jpg 1024w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1200/v1433822967/engagement-2_psdygp.jpg 1200w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_1500/v1433822967/engagement-2_psdygp.jpg 1500w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2000/v1433822967/engagement-2_psdygp.jpg 2000w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2200/v1433822967/engagement-2_psdygp.jpg 2200w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2400/v1433822967/engagement-2_psdygp.jpg 2400w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2600/v1433822967/engagement-2_psdygp.jpg 2600w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_2800/v1433822967/engagement-2_psdygp.jpg 2800w
            , https://res.cloudinary.com/dvxzdky9t/image/upload/c_scale,q_50,w_3000/v1433822967/engagement-2_psdygp.jpg 3000w
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
