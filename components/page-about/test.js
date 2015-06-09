import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import PageAbout from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('PageAbout: constructor', (t) => {
  const pageAbout = React.createElement(PageAbout)
  t.ok(
    isElement(pageAbout)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('PageAbout rendered DOM', (t) => {
  const name = 'Bert'
  const pageAbout = React.createElement(PageAbout, {name})
  const dom = renderIntoDocument(pageAbout)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
