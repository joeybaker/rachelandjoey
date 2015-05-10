import React from 'react'
import WidgetsWhereTo from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<WidgetsWhereTo {...data} />, document.getElementById('app'))
