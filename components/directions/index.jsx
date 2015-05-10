import React, {PropTypes, Component} from 'react'
const namespace = 'directions'

export default class Directions extends Component {
  render () {
    return (<div className={namespace}>
      <iframe width="100%" height="500px" frameBorder="0" src="https://a.tiles.mapbox.com/v4/joeybaker.lbap2chb/zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1Ijoiam9leWJha2VyIiwiYSI6Im9pYTdyNUEifQ.Gff2sHYLfe4hG3TPKZmx9Q"></iframe>
    </div>)
  }
}

Directions.propTypes = {
  name: PropTypes.string.isRequired
}
