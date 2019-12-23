exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.mcss$/,
        include,
        exclude,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          }
        ],
      },
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
})