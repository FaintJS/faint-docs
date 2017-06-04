import {existsSync} from 'fs'
import {join} from 'path'
import * as utils from '../utils'

export default (app: string): void => {
  const jsonPath = join(app, 'faint.json')
  utils.error(
    !existsSync(jsonPath),
    'faint.json is missing.Is it a faint components packages?'
  )
  const json = require(jsonPath)
  utils.error(
    typeof json !== 'object' || !validateJSON(json),
    'faint.json is not configured correctly'
  )
}

const validateJSON = (json: any): boolean => {
  if (typeof json.organization !== 'string') {
    return false
  }
  return true
}

