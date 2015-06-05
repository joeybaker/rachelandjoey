import React from 'react'
import Entry from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Entry {...data} />, document.getElementById('app'))
