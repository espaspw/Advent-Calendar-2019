const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

exports.extractCSS = ({ include, exclude, use = [], useForModules = [] }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          MiniCSSExtractPlugin.loader,
        ].concat(use),
      },
      {
        test: /\.mcss$/,
        include,
        exclude,
        use:[
          MiniCSSExtractPlugin.loader,
        ].concat(useForModules),
      },
    ],
  },
})