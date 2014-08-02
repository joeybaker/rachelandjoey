var test = require('prova')
  , TitleCenter = require('./index.js')

test('TitleCenter Component: lifecycle functions', function(t){

  var titleCenter = new TitleCenter()
  t.equal(
    typeof titleCenter
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('TitleCenter Component: custom method', function(t){
  var titleCenter = new TitleCenter()

  t.end()
})
