import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import PageWeekend from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('PageWeekend: constructor', (t) => {
  const pageWeekend = React.createElement(PageWeekend)
  t.ok(
    isElement(pageWeekend)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('PageWeekend rendered DOM', (t) => {
  const name = 'Bert'
  const pageWeekend = React.createElement(PageWeekend, {name})
  const dom = renderIntoDocument(pageWeekend)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
