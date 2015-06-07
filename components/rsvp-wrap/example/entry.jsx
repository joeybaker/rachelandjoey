import React from 'react'
import RsvpWrap from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<RsvpWrap {...data} />, document.getElementById('app'))
