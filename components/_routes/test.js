import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import Routes from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('Routes: constructor', (t) => {
  const routes = React.createElement(Routes)
  t.ok(
    isElement(routes)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('Routes rendered DOM', (t) => {
  const name = 'Bert'
  const routes = React.createElement(Routes, {name})
  const dom = renderIntoDocument(routes)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
