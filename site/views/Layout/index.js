import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './style.less'

import Index from '../Index'
import stats from '../../stats.json'

const menus = (() => {
  let components = stats.components
  return Object.keys(components).map(name => {
    return {
      name,
      path: components[name].path
    }
  })
})()

export default (props) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>Faint</div>
        <div className={styles.navs}>
          <ul>
            <li className={styles.isActive}>{stats.config.organization}</li>
          </ul>
        </div>
      </header>
      <div className={styles.main}>
        <aside className={styles.aside}>
          <ul>
            {menus.map((menu) => {
              return (
                <li key={menu.name}>
                  <Link to={menu.path} activeClassName={styles.isCurrent}>{menu.name}</Link>
                </li>
              )
            })}
          </ul>
        </aside>
        <div className={styles.page}>
          {props.children}
        </div>
      </div>
      <div className={styles.footer}>
        built with ♥ && faint
    </div>
    </div>
  )
}
