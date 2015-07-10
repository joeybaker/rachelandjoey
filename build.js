const BUILD_TIMER = 'build'
console.time(BUILD_TIMER)

import md5 from 'MD5'
import atomifyCSS from 'atomify-css'
import browserify from 'browserify'
import rebundler from 'rebundler'
import path from 'path'
import fs from 'fs'
import versions from './versions.json'
import pkg from './package.json'

const staticPath = path.join(__dirname, 'static')
const versionsPath = path.join(__dirname, 'versions.json')
const componentPath = path.join(__dirname, 'components')

const writeVersions = () => fs.writeFile(versionsPath, JSON.stringify(versions, null, 2))

const buildJs = function buildJs (entry, mapPath, callback) {
  const entryName = path.basename(mapPath)

  console.info(['info', entryName, 'bundle', 'js'], 'started')

  const bundler = rebundler({persist: true, persistKey: md5(entry), cacheDir: path.join('/tmp/', pkg.name)}, (cache, packageCache) => {
    const b = browserify(entry, {
      debug: true
      , extensions: ['.js', '.json', '.jsx']
      , cache
      , packageCache
      , fullPaths: true
    })

    b.transform('babelify')
    b.plugin('minifyify', {map: mapPath})

    return b
  })


  bundler().bundle((...args) => {
    console.info(['info', entryName, 'bundle', 'js'], 'finished')
    callback.apply(null, args)
  })
}

buildJs(path.join(staticPath, 'entry.js'), '/static/index.js.map', function bundled (err, js, map) {
  if (err) throw err

  versions.js = md5(js)
  fs.writeFile(path.join(staticPath, 'index.js'), js)
  fs.writeFile(path.join(staticPath, 'index.js.map'), map)
  writeVersions()
})

buildJs(path.join(componentPath, 'page-dashboard', 'example', 'entry.jsx'), '/static/dashboard.js.map', function bundled (err, js, map) {
  if (err) throw err

  versions.jsDashboard = md5(js)
  fs.writeFile(path.join(staticPath, 'dashboard.js'), js)
  fs.writeFile(path.join(staticPath, 'dashboard.js.map'), map)
  writeVersions()
})


const buildCss = function buildCss (entry, callback) {
  const entryName = path.basename(entry)
  console.info(['info', entryName, 'bundle', 'css'], 'started')
  atomifyCSS({
    entry
    , compress: true
    , autoprefixer: true
  }, (...args) => {
    console.info(['info', entryName, 'bundle', 'css'], 'finished')
    callback.apply(null, args)
  })
}

buildCss(path.join(componentPath, '_routes', 'index.css'), function builtCss (err, css) {
  if (err) throw err
  versions.css = md5(css)
  fs.writeFile(path.join(staticPath, 'entry.css'), css)
  writeVersions()
})

buildCss(path.join(componentPath, 'page-dashboard', 'index.css'), function builtCss (err, css) {
  if (err) throw err
  versions.cssDashboard = md5(css)
  fs.writeFile(path.join(staticPath, 'dashboard.css'), css)
  writeVersions()
})


process.on('exit', () => console.timeEnd(BUILD_TIMER))
