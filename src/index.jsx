import React from 'react'
import ReactDOM from 'react-dom'
import Test from './test.jsx'

document.addEventListener('DOMContentLoaded', () => {
  console.log(document.getElementById('app'))
  ReactDOM.render(<Test/>, document.getElementById('app'))
})
