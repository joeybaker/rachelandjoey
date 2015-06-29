import React from 'react'
import PageDashboard from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<PageDashboard {...data} />, document.getElementById('app'))
