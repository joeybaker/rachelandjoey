import React from 'react'
import Routes from '../index.jsx'
import Router from 'react-router'
import data from './data.js'

// expose React for debugging
window.React = React

Router.run(Routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...data} />, document.getElementById('app'))
})
