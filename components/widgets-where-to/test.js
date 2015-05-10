import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import WidgetsWhereTo from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('WidgetsWhereTo: constructor', (t) => {
  const widgetsWhereTo = React.createElement(WidgetsWhereTo)
  t.ok(
    isElement(widgetsWhereTo)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('WidgetsWhereTo rendered DOM', (t) => {
  const name = 'Bert'
  const widgetsWhereTo = React.createElement(WidgetsWhereTo, {name})
  const dom = renderIntoDocument(widgetsWhereTo)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
