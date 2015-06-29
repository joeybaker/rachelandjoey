import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import DashboardStats from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('DashboardStats: constructor', (t) => {
  const dashboardStats = React.createElement(DashboardStats)
  t.ok(
    isElement(dashboardStats)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('DashboardStats rendered DOM', (t) => {
  const name = 'Bert'
  const dashboardStats = React.createElement(DashboardStats, {name})
  const dom = renderIntoDocument(dashboardStats)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
