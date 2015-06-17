import React from 'react'
import Routes from '../components/_routes/'
import Router from 'react-router'
import fastClick from 'fastclick'
import data from '../components/_routes/example/data.js'

window.addEventListener('DOMContentLoaded', () => fastClick(document.getElementsByClassName('entry-nav')[0]), false)

Router.run(Routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...data} />, document.getElementById('app'))
})
