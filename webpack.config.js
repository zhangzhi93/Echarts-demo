var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    lineChart: './src/pages/lineChart/index.js',
    pieChart: './src/pages/pieChart/index.js',
    zxChart: './src/pages/zxChart/index.js',
    singlezxChart: './src/pages/singlezxChart/index.js'
  },
  output: {
    filename: '[name]/main.js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: './dist'
  },
  //devtool: 'source-map',
  //mode: 'development',
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      type: "javascript/auto",
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: "babel-loader"
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'less-loader'
      ]
    }]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: 'common',
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'lineChart/yh_yetai_show_1_0.html',
      template: './index.ejs',
      chunks: ['lineChart', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'pieChart/yh_manynode_show_1_0.html',
      template: './index.ejs',
      chunks: ['pieChart', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'zxChart/yh_doublenode_show_1_0.html',
      template: './index.ejs',
      chunks: ['zxChart', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'singlezxChart/yh_singlenode_show_1_0.html',
      template: './index.ejs',
      chunks: ['singlezxChart', 'common'],
      inject: 'head'
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
    inline: true,
    //progress: true, //显示打包的进度
    proxy: {
      '/api': {
        //target:'http://dashiji.gtzmmf.com',
        target:'http://user-dashiji.gtzmmf.com',
        //target:'http://139.224.8.29:19080/',
        // target: {
        //   host: '47.93.193.171',
        //   protocol: 'http',
        //   port: 7170,
        // },
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false
      }
    },
  }
}
