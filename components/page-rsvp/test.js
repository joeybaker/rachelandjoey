import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import PageRsvp from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('PageRsvp: constructor', (t) => {
  const pageRsvp = React.createElement(PageRsvp)
  t.ok(
    isElement(pageRsvp)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('PageRsvp rendered DOM', (t) => {
  const name = 'Bert'
  const pageRsvp = React.createElement(PageRsvp, {name})
  const dom = renderIntoDocument(pageRsvp)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
