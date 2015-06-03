import goodConsole from 'good-console'
import good from 'good'

const initGood = function initGood (server, cb) {
  const goodOpts = {
    opsInterval: 3e4
    , reporters: [{
      reporter: goodConsole
      , events: {
        log: '*'
        , response: '*'
        , error: '*'
        , ops: '*'
        , request: '*'
      }
    }]
  }

  server.register({
    register: good
    , options: goodOpts
  }, cb)
}

export default initGood
