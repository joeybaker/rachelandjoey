import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import Card from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('Card: constructor', (t) => {
  const card = React.createElement(Card)
  t.ok(
    isElement(card)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('Card rendered DOM', (t) => {
  const name = 'Bert'
  const card = React.createElement(Card, {name})
  const dom = renderIntoDocument(card)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
