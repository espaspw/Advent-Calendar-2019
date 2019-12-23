const merge = require('webpack-merge')
const parts = require('./parts/parts')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
  parts.devServer({ host: process.env.HOST, port: process.env.PORT }),
  parts.loadCSS(),
  parts.loadImages(),
  {
    plugins: [
      new HTMLWebpackPlugin({ 
        title: 'EJLX Advent Calendar 2019',
        hash: true,
        meta: {
          charset: { charset: 'utf-8' },
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'ie-edge' },
          google: 'notranslate',
        },
      }),
      new FriendlyErrorsWebpackPlugin(), 
      new MiniCSSExtractPlugin({
        filename: '[name].css',
      }),
      new CleanWebpackPlugin(),
    ],
  },
)