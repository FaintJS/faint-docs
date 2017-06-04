import React, { Component } from 'react'
import cx from 'classnames'
import Markdown from 'react-remarkable'
import Prism from 'prismjs'

import styles from './index.less'
import 'prismjs/components/prism-jsx'

import prismStyles from './prism.less'

export default class extends Component {
  render () {
    let {className, options, ...others} = this.props
    let classes = cx({
      [styles.markdown]: true,
      [prismStyles.markdown]: true,
      [className]: className
    })

    let prismOptions = Object.assign({}, options)
    prismOptions.highlight = (str, lang) => {
      return Prism.highlight(str, Prism.languages[lang])
    }

    return (
      <div className={classes} ref="root">
        <Markdown {...others} options={prismOptions} />
      </div>
    )
  }
}
