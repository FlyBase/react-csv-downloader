import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

const head = [{
  id: 'first',
  displayName: 'First column'
}, {
  id: 'second',
  displayName: 'Second column'
}];

const data = [{
  first: 'foo',
  second: 'bar'
}, {
  first: 'foobar',
  second: 'foobar'
}];

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-csv-downloader Demo</h1>
      <Component
        filename="myfile"
        separator=";"
        columns={head}
        data={data}>
        test
      </Component>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
