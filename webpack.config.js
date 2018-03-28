var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      type: "javascript/auto",
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: "babel-loader"
    }]
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
    inline: true
  }
}
