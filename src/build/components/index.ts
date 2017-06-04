import * as fs from 'fs'
import * as path from 'path'

import { Config } from '../config'

const traverse = (app: string, prefix: string): ComponentMap => {
  let dir = path.join(app, 'components', prefix)
  if (fs.existsSync(path.join(dir, 'component.json'))) {
    let json: ComponentJSON
    try {
      json = JSON.parse(
        fs.readFileSync(path.join(dir, 'component.json'), 'utf-8')
      )
    } catch (e) {
      console.log(e)
      return null
    }
    let fullname = prefix.replace(/\//g, '-').replace(/\\\\/g, '-').replace(/^-/, '')
    let map: ComponentMap = {
      [fullname]: {
        json,
        path: prefix
      }
    }
    if (fs.existsSync(path.join(dir, 'readme.md'))) {
      map[fullname].readme = path.join(dir, 'readme.md')
    }
    if (typeof json.docs === 'object' && json.docs) {
      map[fullname].docs = {}
      for (let name in json.docs) {
        map[fullname].docs[name] = path.join(dir, json.docs[name])
      }
    }
    return map
  } else {
    let files = fs.readdirSync(dir)
    let map = {}
    files.forEach(file => {
      map = Object.assign(map, traverse(app, prefix + '/' + file))
    })
    return map
  }
}

export default (app: string): ComponentMap => {
  return traverse(app, '')
}
