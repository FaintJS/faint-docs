import * as path from 'path'
import * as fs from 'fs'
import * as cp from 'child_process'

import * as shelljs from 'shelljs'
import * as chokidar from 'chokidar'

import loadConfig from './config'
import loadComponents from './components'
import program from '../program'
import * as utils from './utils'

const app = process.cwd()

const copy = (source: string, target: string, renderData: any, update: boolean = false) => {
  let stats = fs.statSync(source)
  if (stats.isFile()) {
    if (source.endsWith('.tpl')) {
      fs.writeFileSync(
        target.replace(/\.tpl$/, ''),
        utils.render(source, renderData)
      )
    } else if (!update) {
      shelljs.cp(source, path.dirname(target))
    }
  } else if (stats.isDirectory()) {
    if (!fs.existsSync(target)) {
      shelljs.mkdir('-p', target)
    }
    fs.readdirSync(source).forEach(file => {
      copy(
        path.join(source, file),
        path.join(target, file),
        renderData
      )
    })
  }
}

const getStats = () => {
  return {
    config: loadConfig(app),
    components: loadComponents(app)
  }
}

let oldStats = getStats()

copy(
  path.join(__dirname, '../../site'),
  path.join(app, '.faint/doc-site'),
  {
    stats: oldStats
  },
  false
)

const refresh = () => {
  setTimeout(() => {
    let stats = getStats()
    if (JSON.stringify(stats) !== JSON.stringify(oldStats)) {
      oldStats = stats
    }
    copy(
      path.join(__dirname, '../../site'),
      path.join(app, '.faint/doc-site'),
      {
        stats: oldStats
      },
      true
    )
  }, 100)

}

chokidar.watch([
  path.join(app, 'components/**/*/component.json')
]).on('add', refresh).on('change', refresh).on('unlink', refresh)

if (program.watch) {
  cp.exec(`cd ${__dirname}/../../ && npm run site-dev -- --app ${app}`).stdout.on('data', console.log)
} else {
  cp.exec(`cd ${__dirname}/../../ && npm run site-build -- --app ${app}`).stdout.on('data', console.log)
}
