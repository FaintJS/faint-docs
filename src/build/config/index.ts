import {join} from 'path'
import check from './check'
export interface Config {
  organization: string
}

export default (app: string): Config => {
  check(app)
  return require(join(app, 'faint.json'))
}
