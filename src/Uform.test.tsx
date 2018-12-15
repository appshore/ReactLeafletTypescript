import React from 'react'
import ReactDOM from 'react-dom'
import Uform from './Uform'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const handleSubmit = (income: number, savings: number) => {
    return true
  }
  ReactDOM.render(
    <Uform
      handleSubmit={handleSubmit}
      minIncome={20000}
      minSavings={10000}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
