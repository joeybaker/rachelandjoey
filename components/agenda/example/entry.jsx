import React from 'react'
import Agenda from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Agenda {...data} />, document.getElementById('app'))
