import React from 'react'
import AgendaDay from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<AgendaDay {...data} />, document.getElementById('app'))
