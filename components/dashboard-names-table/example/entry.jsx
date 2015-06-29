import React from 'react'
import DashboardNamesTable from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<DashboardNamesTable {...data} />, document.getElementById('app'))
