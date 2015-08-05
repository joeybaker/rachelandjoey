import React from 'react'
import PageDashboard from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

const addData = () => {
  data.data.push({attending: false, names: {'hi hi': 'steak'}})
  React.render(<PageDashboard {...data} />, document.getElementById('app'))
}
const addDataContainer = (<div style={{position: 'fixed', width: '100%', height: 50, bottom: 0}}>
    <button onClick={addData}>add data</button>
  </div>)
const addDataEl = document.createElement('div')
addDataEl.id = 'addData'
document.body.appendChild(addDataEl)
React.render(addDataContainer, addDataEl)


React.render(<PageDashboard {...data} />, document.getElementById('app'))

