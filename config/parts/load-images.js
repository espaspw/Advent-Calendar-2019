exports.loadImages = ({ include, exclude, urlLoaderOptions } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options: urlLoaderOptions,
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjepg: {
                progressive: true,
                quality: 65,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
})