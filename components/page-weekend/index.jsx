import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Agenda from '../agenda/'
import WhereTo from '../widgets-where-to/'
import CardRow from '../card-row/'
import Card from '../card/'
import setHead from 'react-document-head'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'pageWeekend'

export default class PageWeekend extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  render () {
    setHead({title: this.props.title})
    return (<div className={namespace}>
      <CardRow>
        <Card>
          <h2>Agenda</h2>
        </Card>
      </CardRow>
      <CardRow>
        <div>
          <img src="https://res.cloudinary.com/dvxzdky9t/image/upload/c_fill,g_center,h_800,q_20,w_1800/v1433909715/villa_tz3fvu.jpg" style={{maxWidth: '100%'}}/>
        </div>
      </CardRow>
      <Agenda events={this.props.events} />
      <CardRow>
        <Card style="inverted">
          <h2>What to Do</h2>
        </Card>
      </CardRow>
      <CardRow>
        <div>
          <img src="https://res.cloudinary.com/dvxzdky9t/image/upload/c_fill,fl_strip_profile,h_800,q_20,w_1800/v1433909714/where_erktao.jpg" style={{maxWidth: '100%'}}/>
        </div>
      </CardRow>
      <WhereTo activities={this.props.activities} />
      <WhereTo activities={this.props.futherActivities} />
      <CardRow>
        <Card>
          <h2>Getting Here</h2>
        </Card>
      </CardRow>
      <CardRow>
        <iframe width="100%" height="500px" frameBorder="0" src="https://a.tiles.mapbox.com/v4/joeybaker.lbap2chb/zoompan.html?access_token=pk.eyJ1Ijoiam9leWJha2VyIiwiYSI6Im9pYTdyNUEifQ.Gff2sHYLfe4hG3TPKZmx9Q"></iframe>
      </CardRow>
      <CardRow>
        <Card>
          <p>Healdsburg is located in the heart of California Wine Country about 65 miles north of the Golden Gate Bridge.</p>
          <p>Although the closest airport is Sonoma County (STS), it will probably be cheaper and more convenient to fly in San Francisco International (SFO). From there, you will either need to rent a car (it is a little less than a two hour drive) or you can take the <a href="http://airportexpressinc.com/schedules.php">Sonoma County Airport Express</a> to STS and <a href="http://www.sonomacountyairport.org/ground-transportation">rent one there</a>.</p>
          <p>The wedding ceremonty is at Quivira Vineyards</p>
          <p>4900 W Dry Creek Rd<br />Healdsburg, CA 95448</p>
        </Card>
        <Card>
          <h4>From San Francisco & other points South</h4>
          <ol>
            <li>Follow US-101 North for about 70 miles</li>
            <li>Take the Dry Creek Rd exit from US-101</li>
            <li>Turn left onto Dry Creek Rd</li>
            <li>After 3.3 miles, turn left onto Lambert Bridge Rd at the stop sign (the general store will be on your right)</li>
            <li>Be careful as you go over the one lane bridge!</li>
            <li>Turn right at the stop sign onto W Dry Creek Rd</li>
            <li>Quivira Vineyards will be on your right! (.3 miles)</li>
          </ol>
        </Card>
        <Card>
          <h4>From Healdsburg</h4>
          <ol>
            <li>Head North on Healdsburg Ave.</li>
            <li>Turn left onto Dry Creek Rd (1.1 miles)</li>
            <li>After 3.6 miles, turn left onto Lambert Bridge Rd at the stop sign (the general store will be on your right)</li>
            <li>Be careful as you go over the one lane bridge!</li>
            <li>Turn right at the stop sign onto W Dry Creek Rd</li>
            <li>Quivira Vineyards will be on your right! (.3 miles)</li>
          </ol>
        </Card>
      </CardRow>
     </div>)
  }
}

PageWeekend.propTypes = {
  events: PropTypes.array.isRequired
  , activities: PropTypes.array.isRequired
  , futherActivities: PropTypes.array.isRequired
  , title: PropTypes.string
}

PageWeekend.defaultProps = {
  events: []
  , activities: []
  , futherActivities: []
  , title: 'Weekend | Rachel & Joey'
}
