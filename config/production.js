const merge = require('webpack-merge')
const parts = require('./parts/parts')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
  parts.extractCSS({
    use: 'css-loader',
    useForModules: {
      loader: 'css-loader',
      options: {
        modules: true,
      },
    },
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: '[hash].[ext]',
    },
  }),
  {
    plugins: [
      new HTMLWebpackPlugin({ 
        title: 'EJLX Advent Calendar 2019',
        hash: true,
        template: '!!prerender-loader?string&entry=./src/index.js!./src/index.js',
        excludeAssets: [/render\.bundle\.js/],
        meta: {
          charset: { charset: 'utf-8' },
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'ie-edge' },
          google: 'notranslate',
        },
      }),
      // new HTMLWebpackPlugin({ 
        
      // }),
      new HTMLWebpackExcludeAssetsPlugin(),
      new FriendlyErrorsWebpackPlugin(), 
      new MiniCSSExtractPlugin({
        filename: '[name].css',
      }),
      new CleanWebpackPlugin(),
    ],
  },
)