import * as program from 'commander'
program
  .version('0.1.0')
  .option('-w --watch', 'run docs site in watch mode')
  .parse(process.argv)

export default program
