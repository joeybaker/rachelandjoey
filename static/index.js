import React from 'react'
import Routes from '../components/_routes/'
import Router from 'react-router'
import data from '../components/_routes/example/data.js'

Router.run(Routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...data} />, document.getElementById('app'))
})
