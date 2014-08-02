var test = require('prova')
  , Body = require('./index.js')

test('Body Component: lifecycle functions', function(t){

  var body = new Body()
  t.equal(
    typeof body
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('Body Component: custom method', function(t){
  var body = new Body()

  t.end()
})
