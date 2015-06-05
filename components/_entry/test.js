import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import Entry from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('Entry: constructor', (t) => {
  const entry = React.createElement(Entry)
  t.ok(
    isElement(entry)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('Entry rendered DOM', (t) => {
  const name = 'Bert'
  const entry = React.createElement(Entry, {name})
  const dom = renderIntoDocument(entry)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
