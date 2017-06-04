import * as fs from 'fs'
import * as path from 'path'

import * as chalk from 'chalk'
import * as template from 'art-template'
import * as shelljs from 'shelljs'
/**
 * show warning msg
 * @param condition show warning msg when false
 * @param msg 
 */
export const warning = (condition: boolean, msg: string) => {
  if (!condition) {
    console.log(chalk.yellow('warning:' + msg))
  }
}

/**
 * show error and exit process
 * @param condition show error and exit process when false
 * @param msg 
 */
export const error = (condition: boolean, msg: string) => {
  if (condition) {
    console.log(chalk.red('error: ' + msg + '\n process will exit'))
    process.exit(0)
  }
}

export const render = (templateFile: string, data = {}) => {
  let content = fs.readFileSync(templateFile, 'utf-8')
  return template.render(content, Object.assign({}, data, {
    global: global
  }))
}

/**
 * 
 * @param file relative path
 * @param content 
 */
export const save = (app: string, file: string, content: string) => {
  file = path.join(
    app,
    '.faint',
    file
  )

  if (!fs.existsSync(path.dirname(file))) {
    shelljs.mkdir('-p', path.dirname(file))
  }
  fs.writeFileSync(file, content)
  return file
}
