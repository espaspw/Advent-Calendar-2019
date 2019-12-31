const merge = require('webpack-merge')
const parts = require('./parts/parts')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
  parts.extractCSS({
    use: ['css-loader', 'postcss-loader'],
    useForModules: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      'postcss-loader',
    ],
  }),
  parts.loadImages({
    urlLoaderOptions: {
      limit: 5000,
      name: '[hash]-[name].[ext]',
    },
  }),
  {
    plugins: [
      new HTMLWebpackPlugin({ 
        title: 'EJLX Advent Calendar 2019',
        hash: true,
        template: '!!prerender-loader?string&entry=./src/render.js!./src/render.js',
        excludeAssets: [/render\.bundle\.js/],
        meta: {
          charset: { charset: 'utf-8' },
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'ie-edge' },
          google: 'notranslate',
        },
      }),
      new HTMLWebpackExcludeAssetsPlugin(),
      new FriendlyErrorsWebpackPlugin(), 
      new MiniCSSExtractPlugin({
        filename: '[name].css',
      }),
      new CleanWebpackPlugin(),
    ],
  },
)