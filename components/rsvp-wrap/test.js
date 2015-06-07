import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import RsvpWrap from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('RsvpWrap: constructor', (t) => {
  const rsvpWrap = React.createElement(RsvpWrap)
  t.ok(
    isElement(rsvpWrap)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('RsvpWrap rendered DOM', (t) => {
  const name = 'Bert'
  const rsvpWrap = React.createElement(RsvpWrap, {name})
  const dom = renderIntoDocument(rsvpWrap)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
