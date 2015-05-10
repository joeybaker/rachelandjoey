import test from 'tape'
import React from 'react'
import {addons} from 'react/addons'
import AgendaDay from './index.jsx'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('AgendaDay: constructor', (t) => {
  const agendaDay = React.createElement(AgendaDay)
  t.ok(
    isElement(agendaDay)
    , 'is a valid react component'
  )

  t.end()
})

// TODO: delete me. I'm just an example!
test('AgendaDay rendered DOM', (t) => {
  const name = 'Bert'
  const agendaDay = React.createElement(AgendaDay, {name})
  const dom = renderIntoDocument(agendaDay)

  t.equal(
    getDOMNodeText(dom, 'h1')
    , name
    , 'renders the `name` prop'
  )

  t.end()
})
