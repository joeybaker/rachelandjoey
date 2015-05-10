import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import WidgetWhereTo from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('WidgetWhereTo: constructor', (t) => {
  const widgetWhereTo = React.createElement(WidgetWhereTo)
  t.ok(
    isElement(widgetWhereTo)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('WidgetWhereTo rendered DOM', (t) => {
  const name = 'Bert'
  const widgetWhereTo = React.createElement(WidgetWhereTo, {name})
  const dom = renderIntoDocument(widgetWhereTo)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
