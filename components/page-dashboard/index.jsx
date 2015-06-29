import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Stats from '../dashboard-stats/'
import NamesTable from '../dashboard-names-table/'
import CardRow from '../card-row/'
import Card from '../card/'
import size from 'lodash/collection/size'
import each from 'lodash/collection/each'
import xhr from 'xhr'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'pageDashboard'

const isBrowser = process.browser
const hasStorage = isBrowser && !!window.localStorage && !!window.localStorage.setItem

export default class PageDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    // TEMP for testing only
    if (props.data.length) {
      this.state.stats = this.makeStats(props.data)
      this.state.persons = this.makePersons(props.data)
    }

    if (hasStorage) {
      const raw = window.localStorage.getItem(namespace)
      if (raw) this.state = JSON.parse(raw)
    }

    this.state.bannerMessage = 'Loading latest data…'
  }

  // executed only on the client
  componentDidMount () {
    xhr({
      url: `/api/dashboard/names`
      , encoding: null
      , json: true
    }, (err, res, data) => {
      if (err) {
        this.setState({bannerMessage: err.toString()})
        console.error(err)
      }
      else if (res.statusCode >= 300) {
        this.setState({bannerMessage: data.toString()})
        console.error(data)
      }
      else {
        const stats = this.makeStats(data)
        const persons = this.makePersons(data)
        const parsed = {stats, persons}

        if (hasStorage) {
          window.localStorage.setItem(namespace, JSON.stringify(parsed))
        }

        this.setState(parsed)
        this.setState({bannerMessage: false})
      }
    })
  }

  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  makeStats (data) {
    const stats = {
      confirmed: 0
      , regrets: 0
      , unheard: 0
      , steak: 0
      , chicken: 0
      , vegie: 0
    }

    data.forEach((group) => {
      const count = size(group.names)
      let key

      if (group.attending) key = 'confirmed'
      else if (group.attending === false) key = 'regrets'
      else if (group.attending === null) key = 'unheard'

      stats[key] = count

      each(group.names, (meal) => stats[meal]++)
    })

    return stats
  }

  makePersons (data) {
    const persons = []

    data.forEach((group) => {
      const {attending} = group
      each(group.names, (meal, name) => {
        persons.push({attending, meal, name})
      })
    })

    return persons
  }

  render () {
    const loadingBanner = (
      <CardRow className={`${namespace}-alert`}>
        <Card style="inverted">
          <h3>{this.state.bannerMessage}</h3>
        </Card>
      </CardRow>
    )

    return (<div className={namespace}>
      {this.state.bannerMessage ? loadingBanner : ''}
      <Stats stats={this.state.stats} />
      <NamesTable persons={this.state.persons} />
    </div>)
  }
}

PageDashboard.propTypes = {
  data: PropTypes.array
}

PageDashboard.defaultProps = {
  data: []
}
