import React from 'react'
import { Router, Route, hashHistory, PlainRoute } from 'react-router'
import Index from './views/Index'
import Layout from './views/Layout'
import childRoutes from './routes'

const routes = {
  path: '/',
  component: Layout,
  indexRoute: {
    component: Index
  },
  childRoutes: childRoutes
}

export default () => {
  return (
    <Router history={hashHistory} routes={routes} />
  )
}
