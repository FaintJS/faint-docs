import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import './app.global.less'

if (process.env.NODE_ENV === 'development') {
  let AppContainer = require('react-hot-loader').AppContainer
  let render = (Comp, key = 0) => {
    ReactDOM.render(
      <AppContainer key={key}>
        <Comp />
      </AppContainer>,
      document.getElementById('APP')
    )
  }
  render(Router)
  if (module.hot) {
    module.hot.accept(
      './router',
      () => render(require('./router').default, Math.random())
    )
  }
} else {
  ReactDOM.render(
    <Router />,
    document.getElementById('APP')
  )
}
