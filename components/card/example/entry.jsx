import React from 'react'
import Card from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Card {...data} />, document.getElementById('app'))
