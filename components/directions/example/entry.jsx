import React from 'react'
import Directions from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Directions {...data} />, document.getElementById('app'))
