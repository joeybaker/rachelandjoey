import React from 'react'
import Routes from '../components/_routes/'
import Router from 'react-router'
import FastClick from 'fastclick'
import data from '../components/_routes/example/data.js'

window.addEventListener('DOMContentLoaded', () => FastClick(document.body), false)

Router.run(Routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...data} />, document.getElementById('app'))
})
