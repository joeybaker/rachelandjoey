import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import DashboardNamesTable from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('DashboardNamesTable: constructor', (t) => {
  const dashboardNamesTable = React.createElement(DashboardNamesTable)
  t.ok(
    isElement(dashboardNamesTable)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('DashboardNamesTable rendered DOM', (t) => {
  const name = 'Bert'
  const dashboardNamesTable = React.createElement(DashboardNamesTable, {name})
  const dom = renderIntoDocument(dashboardNamesTable)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
