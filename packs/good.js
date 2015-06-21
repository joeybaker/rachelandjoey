import merge from 'lodash/object/merge'
import goodConsole from 'good-console'
import goodLoggly from 'good-loggly'
import good from 'good'

const initGood = function initGood (server, cb) {
  const goodEvents = ['log', 'response', 'error', 'ops', 'request']
  const reporters = []
  reporters.push({
    reporter: goodConsole
    , events: {
      log: '*'
      , response: '*'
      , error: '*'
      , ops: '*'
      , request: '*'
    }
  })

  const logglyToken = server.app.config.loggly.token
  const logglySubdomain = server.app.config.loggly.subdomain

  if (logglyToken && logglySubdomain) {
    const allLogglyOptions = {
      reporter: goodLoggly
      , events: {}
      , config: {
        token: logglyToken
        , subdomain: logglySubdomain
        , name: server.app.config.app.name
        // hard code the hostname since we don't care about server-restarts
        , hostname: server.app.config.app.name
        , tags: [server.app.config.nodeEnv]
      }
    }

    goodEvents.forEach((goodEvent) => {
      // ops events aren't supported by loggly :(
      if (goodEvent === 'ops') return

      const tags = [goodEvent]

      if (goodEvent === 'request' || goodEvent === 'response') {
        tags.push('http')
      }

      const reporter = merge({}, allLogglyOptions, {
        events: {
          [goodEvent]: '*'
        }
        , config: {
          tags
        }
      })
      reporters.push(reporter)
    })
  }
  else {
    server.log(['warn', 'server', 'init', 'good', 'loggly'], {
      message: 'loggly config not found. Logs not being saved'
      , token: !!logglyToken
      , subdomain: !!logglySubdomain
    })
  }

  const goodOpts = {
    opsInterval: 6e4
    , reporters
  }

  server.register({
    register: good
    , options: goodOpts
  }, cb)
}

export default initGood
