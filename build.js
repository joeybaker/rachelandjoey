import md5 from 'MD5'
import atomifyCSS from 'atomify-css'
import browserify from 'browserify'
import path from 'path'
import fs from 'fs'
import versions from './versions.json'

const staticPath = path.join(__dirname, 'static')
const versionsPath = path.join(__dirname, 'versions.json')

const writeVersions = () => fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2))

const buildJs = function buildJs (callback) {
  console.info(['info', 'http', 'bundle', 'js'], 'started')
  const b = browserify({
    debug: true
    , extensions: ['.js', '.json', '.jsx']
  })

  b.add(path.join(staticPath, 'entry.js'))

  b.transform('babelify')
  b.plugin('minifyify', {map: '/static/index.js.map'})

  b.bundle((...args) => {
    console.info(['info', 'http', 'bundle', 'js'], 'finished')
    callback.apply(null, args)
  })
}
buildJs(function bundled (err, js, map) {
  if (err) throw err

  versions.js = md5(js)
  fs.writeFileSync(path.join(staticPath, 'index.js'), js)
  fs.writeFileSync(path.join(staticPath, 'index.js.map'), map)
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
  fs.writeFileSync(path.join(staticPath, 'entry.css'), css)
  writeVersions()
})
