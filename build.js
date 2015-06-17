const BUILD_TIMER = 'build'
console.time(BUILD_TIMER)

import md5 from 'MD5'
import atomifyCSS from 'atomify-css'
import browserify from 'browserify'
import browserifyIncremental from 'browserify-incremental'
import assign from 'lodash/object/assign'
import path from 'path'
import fs from 'fs'
import versions from './versions.json'

const staticPath = path.join(__dirname, 'static')
const versionsPath = path.join(__dirname, 'versions.json')

const writeVersions = () => fs.writeFile(versionsPath, JSON.stringify(versions, null, 2))

const buildJs = function buildJs (callback) {
  console.info(['info', 'http', 'bundle', 'js'], 'started')
  const b = browserify(assign({
    debug: true
    , extensions: ['.js', '.json', '.jsx']
    , cacheFile: path.join('/tmp', `${path.basename(__dirname)}-browserify-cache.json`)
  }, browserifyIncremental.args))

  b.add(path.join(staticPath, 'entry.js'))

  b.transform('babelify')
  b.plugin('minifyify', {map: '/static/index.js.map'})

  browserifyIncremental(b)

  b.bundle((...args) => {
    console.info(['info', 'http', 'bundle', 'js'], 'finished')
    callback.apply(null, args)
  })
}
buildJs(function bundled (err, js, map) {
  if (err) throw err

  versions.js = md5(js)
  fs.writeFile(path.join(staticPath, 'index.js'), js)
  fs.writeFile(path.join(staticPath, 'index.js.map'), map)
  writeVersions()
})

const buildCss = function buildCss (callback) {
  console.info(['info', 'http', 'bundle', 'css'], 'started')
  atomifyCSS({
    entry: path.join(__dirname, 'components', '_routes', 'index.css')
    , compress: true
    , autoprefixer: true
  }, (...args) => {
    console.info(['info', 'http', 'bundle', 'css'], 'finished')
    callback.apply(null, args)
  })
}
buildCss(function builtCss (err, css) {
  if (err) throw err
  versions.css = md5(css)
  fs.writeFile(path.join(staticPath, 'entry.css'), css)
  writeVersions()
})

process.on('exit', () => console.timeEnd(BUILD_TIMER))
