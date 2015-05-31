import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import RsvpForm from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('RsvpForm: constructor', (t) => {
  const rsvpForm = React.createElement(RsvpForm)
  t.ok(
    isElement(rsvpForm)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('RsvpForm rendered DOM', (t) => {
  const name = 'Bert'
  const rsvpForm = React.createElement(RsvpForm, {name})
  const dom = renderIntoDocument(rsvpForm)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
