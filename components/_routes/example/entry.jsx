import React from 'react'
import Routes from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Routes {...data} />, document.getElementById('app'))
