import path from 'path'
import fs from 'fs'
import ReactRoutes from '../components/_routes/'
import ReactData from '../components/_routes/example/data.js'
import versions from '../versions.json'
import React from 'react'
import ReactRouter from 'react-router'

const expiresIn = 1000 * 60 * 60 * 24

const html = fs.readFileSync(path.join(__dirname, '..', 'static', 'index.html')).toString()
  .replace('/index.js', `/${versions.js}/index.js`)
  .replace('/entry.css', `/${versions.css}/entry.css`)

const htmlCache = {}

const handler = (req, reply) => {
  // TODO: move this to a server method
  if (htmlCache[req.path]) {
    const response = reply(htmlCache[req.path]).type('text/html')
    // TODO: remove this. it's because I fucked up and the cache needs to be busted
    response.ttl(expiresIn)
  }
  else {
    ReactRouter.run(ReactRoutes, req.path, (Handler) => {
      const initialHTML = React.renderToString(React.createElement(Handler, ReactData))
      let title = 'Rachel & Joey'

      if (React.documentHead) {
        title = React.documentHead.title
        React.documentHead = {}
      }

      const outHtml = html
        .replace('id="app">', 'id="app">' + initialHTML)
        .replace('<title>Rachel & Joey</title>', `<title>${title}</title>`)

      const response = reply(outHtml).type('text/html')
      htmlCache[req.path] = outHtml

      // TODO: remove this. it's because I fucked up and the cache needs to be busted
      response.ttl(expiresIn)
    })
  }
}

export default {
  path: '/{path*}'
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
