import React from 'react'
import AgendaEvent from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<AgendaEvent {...data} />, document.getElementById('app'))
