import React from 'react'
import PageAbout from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<PageAbout {...data} />, document.getElementById('app'))
