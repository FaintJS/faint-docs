import React from 'react'
import { Component } from 'react'
import styles from './style.less'
import stats from '../../stats.json'

export default () => {
  return (
      <div className={styles.page}>
        <h2>{stats.config.organization} Components Library For React</h2>
        <div>Faint Components Docs Site2</div>
      </div>
  )
}
