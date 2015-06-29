import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import {Table, Column} from 'fixed-data-table'
import clone from 'lodash/lang/clone'
import ElementQuery from '../element-query/'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'dashboardNamesTable'

const isBrowser = process.browser

export default class DashboardNamesTable extends Component {
  constructor (props) {
    super(props)
    const windowWidth = isBrowser ? window.innerWidth : 320
    const columnWidths = this.autoSizeColumns(windowWidth)
    this.state = {
      persons: this.makeRows(props.persons)
      , width: windowWidth
      , columnWidths
      , isColumnResizing: false
      , hasColumnsResized: false
    }
  }

  componentWillMount () {
    ElementQuery.register(this, {}, this.onResize.bind(this))
  }

  componentWillReceiveProps (newProps) {
    this.setState({persons: this.makeRows(newProps.persons)})
  }

  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  componentWillUnmount () {
    ElementQuery.unregister(this)
  }

  makeRows (persons) {
    return persons.map((person) => {
      return [person.name, person.attending, person.meal]
    })
  }

  autoSizeColumns (windowWidth) {
    const columnWidth = windowWidth / 3
    return [columnWidth, columnWidth, columnWidth]
  }

  rowGetter (index) {
    return this.state.persons[index]
  }

  onResize () {
    const updatedState = {width: window.innerWidth}

    if (!this.state.hasColumnsResized) {
      updatedState.columnWidths = this.autoSizeColumns(updatedState.width)
    }

    this.setState(updatedState)
  }

  onColumnResize (width, key) {
    const columnWidths = clone(this.state.columnWidths)
    columnWidths[key] = width

    this.setState({columnWidths, isColumnResizing: false, hasColumnsResized: true})
  }

  render () {
    return (<div className={namespace}>
      <Table
        rowHeight={50}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this.state.persons.length}
        width={this.state.width}
        maxHeight={5000}
        headerHeight={50}
        isColumnResizing={this.state.isColumnResizing}
        onColumnResizeEndCallback={this.onColumnResize.bind(this)}
      >
        <Column
          label="Name"
          width={this.state.columnWidths[0] > 100 ? this.state.columnWidths[0] : 100}
          minWidth={100}
          maxWidth={1000}
          dataKey={0}
          isResizable={true}
          allowCellsRecycling={true}
          fixed={true}
        />
        <Column
          label="Attending"
          width={this.state.columnWidths[1]}
          minWidth={100}
          maxWidth={1000}
          dataKey={1}
          isResizable={true}
          allowCellsRecycling={true}
        />
        <Column
          label="Meal"
          width={this.state.columnWidths[2]}
          minWidth={100}
          maxWidth={1000}
          dataKey={2}
          isResizable={true}
          allowCellsRecycling={true}
        />
      </Table>
    </div>)
  }
}

DashboardNamesTable.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
    , attending: PropTypes.bool
    , meal: PropTypes.string
  })).isRequired
}

DashboardNamesTable.defaultProps = {
  persons: []
}
