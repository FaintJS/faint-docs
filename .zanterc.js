const path = require('path')
const argv = require('yargs').argv
const webpack = require('webpack')

module.exports = {
  source: [
    path.join(argv.app, '.faint/doc-site'),
    path.join(argv.app, 'components')
  ],
  entry: {
    app: path.join(argv.app, '.faint/doc-site/app')
  },
  output: {
    path: path.join(argv.app, '.faint/doc-site-dist')
  },
  resolve: {
    modules: [
      path.join(argv.app, 'node_modules'),     
      path.join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    'es',
    // 'eslint',
    'css',
    'assets',
    'less'
  ],
  env: {
    production: {
      output: {
        publicPath: 'http://xxx.cdn.com'
      },
      plugins: [
        'production',        
        'optimize',
        'commonchunk',
        'html'
      ]
    },
    development: {
      plugins: [
        'development',
        'dll',
        'react-hmr',
        [
          'html',
          [{
            filename: 'index.html',
            dll: true
          }]
        ],
        'static',
        [
          'proxy',
          {
            api: 'http://mock-server.com'
          }
        ]
      ]
    }
  }
}
