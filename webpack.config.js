const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV)

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
    // publicPath: './dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          name: 'common',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    host: 'localhost',
    port: 6060,
    open: true,
    inline: true,
    progress: true, //显示打包的进度
    proxy: {
      '/api': {
        //target:'http://dashiji.gtzmmf.com',
        target: 'http://user-dashiji.gtzmmf.com',
        //target: 'http://139.224.8.29:19080/',
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      }
    },
  }
}

if (isProduction) {
  module.exports.plugins.push(
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'lineChart/yh_yetai_show_1_0.html',
      template: './index.ejs',
      chunks: ['lineChart', 'vendors', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'pieChart/yh_manynode_show_1_0.html',
      template: './index.ejs',
      chunks: ['pieChart', 'vendors', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'zxChart/yh_doublenode_show_1_0.html',
      template: './index.ejs',
      chunks: ['zxChart', 'vendors', 'common'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'singlezxChart/yh_singlenode_show_1_0.html',
      template: './index.ejs',
      chunks: ['singlezxChart', 'vendors', 'common'],
      inject: 'head'
    }),
  );
}
