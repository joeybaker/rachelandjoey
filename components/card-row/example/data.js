import React from 'react'
import Card from '../../card/'
import range from 'lodash/utility/range'
export default {
  children: range(3).map(() => <Card style="inverted"><h2>hi</h2><p>sup</p></Card>)
}
