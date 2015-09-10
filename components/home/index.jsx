import React, {Component, PropTypes} from 'react'
import moment from 'moment'
// import RsvpWrap from '../rsvp-wrap/'
import setHead from 'react-document-head'
const namespace = 'home'

const makeUrl = (url, width) => {
  return url.replace('upload/v', `upload/c_scale,q_50,w_${width}/v`)
}

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
    }, 6e4)
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
    const imageUrl = 'https://res.cloudinary.com/dvxzdky9t/image/upload/v1441840590/2015-09-09_0005_ldv7z7.jpg'
    const srcSet = `${makeUrl(imageUrl, 2000)} 2x, ${makeUrl(imageUrl, 4000)} 3x`

    return (
      <div className={namespace}>
        <div className={`${namespace}-banner`}>
          <img
            src={makeUrl(imageUrl, 1200)}
            srcSet={srcSet}
            sizes="100vw"
            alt="Rachel & Joey"
          />
          <h1 className={`${namespace}-title`}>{this.state.timeRemaining}</h1>
          <cite><small><a href="http://www.tjsalsmanphotography.com">Photo by TJ Salsman</a></small></cite>
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
