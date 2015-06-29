import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import ElementQuery from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('ElementQuery: constructor', (t) => {
  const elementQuery = React.createElement(ElementQuery)
  t.ok(
    isElement(elementQuery)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('ElementQuery rendered DOM', (t) => {
  const name = 'Bert'
  const elementQuery = React.createElement(ElementQuery, {name})
  const dom = renderIntoDocument(elementQuery)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
