import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import AgendaEvent from './index.jsx'
const {TestUtils} = addons
/* eslint-disable */
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('AgendaEvent: constructor', (t) => {
  const agendaEvent = React.createElement(AgendaEvent)
  t.ok(
    isElement(agendaEvent)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('AgendaEvent rendered DOM', (t) => {
  const name = 'Bert'
  const agendaEvent = React.createElement(AgendaEvent, {name})
  const dom = renderIntoDocument(agendaEvent)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
