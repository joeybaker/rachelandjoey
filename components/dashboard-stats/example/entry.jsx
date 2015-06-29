import React from 'react'
import DashboardStats from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<DashboardStats {...data} />, document.getElementById('app'))
