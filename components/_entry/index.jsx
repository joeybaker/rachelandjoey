'use strict'

var React = require('react')
  , Home = require('../home/index.jsx')

// expose React so that dev tools will work
window.React = React

React.render(React.createElement(Home, null), document.body)
