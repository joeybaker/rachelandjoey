import React from 'react'
import PageWeekend from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<PageWeekend {...data} />, document.getElementById('app'))
