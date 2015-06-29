import path from 'path'
import fs from 'fs'
import versions from '../versions.json'
import React from 'react'
import Helmet from 'react-helmet'
import Dashboard from '../components/page-dashboard/'
import dashboardNamesQuery from '../queries/dashboard-names'

const expiresIn = 1000 * 60

const html = fs.readFileSync(path.join(__dirname, '..', 'static', 'index.html')).toString()
  .replace('/index.js', `/${versions.jsDashboard}/dashboard.js`)
  .replace('/entry.css', `/${versions.cssDashboard}/dashboard.css`)


const handler = (req, reply) => {
  const {r, conn} = req.server.plugins.rethinkdb
  dashboardNamesQuery(r, conn, (err, data) => {
    if (err) return void reply(err)

    const initialHTML = React.renderToString(React.createElement(Dashboard, {data}))
    const head = Helmet.rewind()

    const title = head.title || 'Rachel & Joey'

    const outHtml = html
      .replace('id="app">', 'id="app">' + initialHTML)
      .replace('<title>Rachel & Joey</title>', `<title>${title}</title>`)

    reply(outHtml).type('text/html')
  })
}

export default {
  path: '/dashboard'
  , method: 'GET'
  , config: {
    handler
    , cache: {
      privacy: 'public'
      , expiresIn: expiresIn
    }
    , tags: ['assets', 'html']
    , description: 'single html file'
  }
}
