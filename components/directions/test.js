import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import Directions from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('Directions: constructor', (t) => {
  const directions = React.createElement(Directions)
  t.ok(
    isElement(directions)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('Directions rendered DOM', (t) => {
  const name = 'Bert'
  const directions = React.createElement(Directions, {name})
  const dom = renderIntoDocument(directions)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
