import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Card from '../card/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'widgetWhereTo'

export default class WidgetWhereTo extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    const reccomendations = this.props.reccomendations.map((reccomendation) => {
      return <li key={reccomendation.name}><a className={`${namespace}-link`} href={reccomendation.link}>{reccomendation.name}</a></li>
    })
    return (<Card style={this.props.style}>
      <div className={namespace}>
        <h3 className={`${namespace}-title`}>{this.props.title}</h3>
        <p className={`${namespace}-description`}>{this.props.description}</p>
        <ul className={`${namespace}-recs`}>
          {reccomendations}
          <li><a className={`${namespace}-link`} href={this.props.link}>{this.props.cta}</a></li>
        </ul>
      </div>
    </Card>)
  }
}

WidgetWhereTo.propTypes = {
  title: PropTypes.string.isRequired
  , description: PropTypes.string
  , link: PropTypes.string.isRequired
  , reccomendations: PropTypes.arrayOf(PropTypes.object).isRequired
  , cta: PropTypes.string.isRequired
  , style: PropTypes.string
}

WidgetWhereTo.defaultProps = {
  reccomendations: []
  , style: 'inverted'
}
