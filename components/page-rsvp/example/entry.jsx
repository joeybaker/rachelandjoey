import React from 'react'
import PageRsvp from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<PageRsvp {...data} />, document.getElementById('app'))
