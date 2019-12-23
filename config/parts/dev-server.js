exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    host: host,
    port: port,
    overlay: true,
    open: true,
  },
})