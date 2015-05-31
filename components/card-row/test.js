import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import CardRow from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('CardRow: constructor', (t) => {
  const cardRow = React.createElement(CardRow)
  t.ok(
    isElement(cardRow)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('CardRow rendered DOM', (t) => {
  const name = 'Bert'
  const cardRow = React.createElement(CardRow, {name})
  const dom = renderIntoDocument(cardRow)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
