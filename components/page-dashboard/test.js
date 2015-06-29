import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import PageDashboard from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('PageDashboard: constructor', (t) => {
  const pageDashboard = React.createElement(PageDashboard)
  t.ok(
    isElement(pageDashboard)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('PageDashboard rendered DOM', (t) => {
  const name = 'Bert'
  const pageDashboard = React.createElement(PageDashboard, {name})
  const dom = renderIntoDocument(pageDashboard)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
