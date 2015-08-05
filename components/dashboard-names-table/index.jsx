import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import {Table, Column} from 'fixed-data-table'
import clone from 'lodash/lang/clone'
import ElementQuery from '../element-query/'
import sortBy from 'lodash/collection/sortBy'
import last from 'lodash/array/last'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'dashboardNamesTable'

const isBrowser = process.browser

const SORT_TYPES = {
  ASCD: 'assending'
  , DESC: 'desceding'
}

const COLUMNS = {
  NAME: 'name'
  , ATTENDING: 'attending'
  , MEAL: 'meal'
}

export default class DashboardNamesTable extends Component {
  constructor (props) {
    super(props)
    const windowWidth = isBrowser ? window.innerWidth : 320
    const columnWidths = this.autoSizeColumns(windowWidth)
    this.state = {
      persons: props.persons
      , width: windowWidth
      , columnWidths
      , isColumnResizing: false
      , hasColumnsResized: false
      , sortBy: 'attending'
      , sortDirection: null
    }
  }

  componentWillMount () {
    ElementQuery.register(this, {}, this.onResize.bind(this))
  }

  componentWillReceiveProps (newProps) {
    const {persons} = newProps
    this.setState({persons}, () => this.rowSortBy(this.state.sortBy))
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

  autoSizeColumns (windowWidth) {
    const columnWidth = windowWidth / 3
    return [columnWidth, columnWidth, columnWidth]
  }

  rowGetter (index) {
    return this.state.persons[index]
  }

  rowSortBy (dataKey) {
    let sortDirection

    // if we have a sort alread set, and it's the same as what we are sorting,
    // invert. Else, set to DESC
    if (dataKey === this.state.sortBy) {
      sortDirection = this.state.sortDirection === SORT_TYPES.ASCD
        ? SORT_TYPES.DESC
        : SORT_TYPES.ASCD
    }
    else {
      sortDirection = SORT_TYPES.DESC
    }

    // clone so that we don't mess up the immutate state
    const sortedRows = dataKey === COLUMNS.NAME
      ? sortBy(this.state.persons, (person) => last(person.name.split(' ')))
      : sortBy(this.state.persons, dataKey)

    // if we're in decending sort order, reverse the default sort
    if (sortDirection === SORT_TYPES.ASCD) {
      sortedRows.reverse()
    }

    this.setState({
      persons: sortedRows
      , sortBy: dataKey
      , sortDirection
    })
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

  renderHeader (label, dataKey) {
    return (
      <a onClick={this.rowSortBy.bind(this, dataKey)}>{label}</a>
    )
  }

  render () {
    let sortDirectionArrow = ''
    const sortyBy = this.state.sortBy

    if (this.state.sortDirection) {
      sortDirectionArrow = this.state.sortDirection === SORT_TYPES.DESC ? '↓' : '↑'
    }

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
          label={`Name ${sortyBy === 'name' ? sortDirectionArrow : ''}`}
          headerRenderer={::this.renderHeader}
          width={this.state.columnWidths[0] > 100 ? this.state.columnWidths[0] : 100}
          minWidth={100}
          maxWidth={1000}
          dataKey={COLUMNS.NAME}
          isResizable={true}
          allowCellsRecycling={true}
          fixed={true}
        />
        <Column
          label={`Attending ${sortyBy === 'attending' ? sortDirectionArrow : ''}`}
          headerRenderer={::this.renderHeader}
          width={this.state.columnWidths[1]}
          minWidth={100}
          maxWidth={1000}
          dataKey={COLUMNS.ATTENDING}
          isResizable={true}
          allowCellsRecycling={true}
        />
        <Column
          label={`Meal ${sortyBy === 'meal' ? sortDirectionArrow : ''}`}
          headerRenderer={::this.renderHeader}
          width={this.state.columnWidths[2]}
          minWidth={100}
          maxWidth={1000}
          dataKey={COLUMNS.MEAL}
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
