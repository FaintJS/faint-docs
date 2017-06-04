import * as React from 'react'
import { Component } from 'react'
import cx from 'classnames'
import Markdown from '../Markdown'
import styles from './index.less'

interface Props {
  title: string,
  desc: string,
  children: React.ReactNode,
  code: string
}

const defaultProps = {
  desc: '',
  code: ''
}

export default class Example extends Component<Props, any> {
  static defaultProps = defaultProps
  static displayName = 'Example'

  state = {
    open: false
  }

  constructor (props) {
    super(props)
    this.toggleCode = this.toggleCode.bind(this)
  }

  toggleCode () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    let open = this.state.open
    return (
      <div className={styles.example}>
        <Markdown source={`#### ${this.props.title}`} />
        <Markdown source={this.props.desc} />
        <div className={styles.body}>
          <div className={styles.demo}>
            {this.props.children}
          </div>
          <div className={cx({ [styles.code]: true, [styles.open]: open })}>
            <Markdown source={this.props.code} className={styles.sourceMarkdown}/>
          </div>
          <div className={styles['code-toggle']} onClick={this.toggleCode}>
            {open ? '隐藏代码' : '显示代码'}
          </div>
        </div>
      </div>
    )
  }
}
