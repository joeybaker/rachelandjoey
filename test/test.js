'use strict'

require('babel/register')

const test = require('tape')
  , rachelandjoey = require('../')

test('rachelandjoey#get', function getTest(t){
  rachelandjoey()
  t.equal(
    false
    , 'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
