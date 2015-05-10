import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import Agenda from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('Agenda: constructor', (t) => {
  const agenda = React.createElement(Agenda)
  t.ok(
    isElement(agenda)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('Agenda rendered DOM', (t) => {
  const name = 'Bert'
  const agenda = React.createElement(Agenda, {name})
  const dom = renderIntoDocument(agenda)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
