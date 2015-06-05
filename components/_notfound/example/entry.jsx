import React from 'react'
import Notfound from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Notfound {...data} />, document.getElementById('app'))
