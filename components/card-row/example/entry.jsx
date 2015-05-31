import React from 'react'
import CardRow from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<CardRow {...data} />, document.getElementById('app'))
