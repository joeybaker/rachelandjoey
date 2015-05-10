import React from 'react'
import WidgetWhereTo from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<WidgetWhereTo {...data} />, document.getElementById('app'))
