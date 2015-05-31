import React from 'react'
import RsvpForm from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<RsvpForm {...data} />, document.getElementById('app'))
