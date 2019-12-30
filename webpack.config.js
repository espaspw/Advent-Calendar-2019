require('dotenv').config()
const merge = require('webpack-merge')
const path = require('path')

const production = require('./config/production')
const development = require('./config/development')

const common = merge(
  {
    entry: {
      render: path.join(__dirname, 'src', 'render.js'),
      main: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
  },
)


console.dir(merge(common, development), {depth:100})
module.exports = mode => {
  if (mode === 'production') {
    return merge(common, production, { mode })
  } else if (mode === 'development') {
    return merge(common, development, { mode })
  }
  console.error('Did you forget to set --env to production or development?')
  console.error('Defaulting to development build')
  return merge(common, development, { mode })
}